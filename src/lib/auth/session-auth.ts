"use server"
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import getDbConnection from "@/lib/db"; 
import { FieldPacket, RowDataPacket } from "mysql2";
import { TSession, TSessionValidationResult, TUser } from "../types/auth/session/session-type";

const db = await getDbConnection();

/* 
    1.) Generate session token
    2.) Create session
    3.) Validate session
    4.) Invalidate session
*/


export async function generateSessionToken(): Promise<string> {

    const bytes = new Uint8Array(20);
    const randomBytes = crypto.getRandomValues(bytes);

    const token = encodeBase32LowerCaseNoPadding(randomBytes);
    return token;
}

export async function createSession(token: string, userId: number): Promise<TSession> {

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const session: TSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        token
	};

    const [results, fields] = await db.execute(
		"INSERT INTO user_session (id, user_id, expires_at, token) VALUES (?, ?, ?, ?)",
		[session.id, session.userId, session.expiresAt, session.token]
	);

    console.log(results, "RESULTS"); //results contain rows returned by server
    console.log(fields, "FIELDSSS"); // fields contains extra meta data about results, if available
    return session;
}

export async function validateSessionToken(token: string): Promise<TSessionValidationResult> {

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    // select and check if session exists in the database
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT user_session.id, user_session.user_id, user_session.expires_at, users.id FROM user_session INNER JOIN users ON users.id = user_session.user_id WHERE user_session.id = ?",
        [sessionId]
    );

    if(rows.length === 0) return { session: null, user: null }; // if no session;

    const row = rows[0];

    const session: TSession = {
        id: row.id,
        userId: row.user_id,
        expiresAt: row.expires_at,
        token
    }

    const user: TUser = {
        id: row.id
    }
    // if session, 2 conditions check
    const expiresAt = new Date(session.expiresAt);
    // check A is if session has expired

    if(Date.now() >= expiresAt.getTime()) {
        await db.execute(
            "DELETE FROM user_session where id = ?",
            [sessionId]
        );
        return { session: null, user: null };
    }

    // Check B if it expires in 15 days, extend the session from now

    if(Date.now() >= expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

        await db.execute(
            "UPDATE user_session SET expires_at = ? WHERE id = ?",
            [session.expiresAt, session.id]
        );

    }

    return { session, user };


}

export async function invalidateSession(sessionId: string): Promise<boolean> {

    await db.execute(
        "DELETE FROM user_session where id = ?",
        [sessionId]
    );

    return true;

} 




