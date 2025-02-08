"use server"
import getDbConnection from "@/lib/db";
import { FieldPacket, RowDataPacket } from "mysql2";
import verifyPassword from "./verify-password";
import { 
    createSession, 
    generateSessionToken, 
    invalidateSession, 
    validateSessionToken 
} from "./session-auth";
import { redirect } from "next/navigation";
import { setSessionTokenCookie } from "./cookies";
import { TLoginProps, TLoginResponse } from "../types/auth/login/login-type";


export default async function loginUser(
    { 
        email, 
        password 
    } : TLoginProps
): Promise<TLoginResponse> {
    
    const db = await getDbConnection();
    try {
        // First check if such a user exists
        const [row]: [RowDataPacket[], FieldPacket[]] = await db.query(
            `SELECT id, hashed_password FROM users WHERE email = ? LIMIT 1`,
            [email]
        );

        // Handle if not
        if(row.length === 0 || row === null) return { success: false, message: 'User does not exist' };

        const userData = row[0];

        const { hashed_password, id } = userData;

        // Second check if session is in db
        const [sessionResult]: [RowDataPacket[], FieldPacket[]] = await db.query(
            `SELECT * FROM user_session where user_id = ? LIMIT 1`,
            [id]
        );

        if(sessionResult.length > 0) {
            const { id: sessionId } = sessionResult[0];

            const destroyOldSession = await invalidateSession(sessionId);
            
            if(destroyOldSession) await validateSessionToken(sessionId);
        }

        // third check if correct password
        const passVerified = await verifyPassword({ hashed_password, password });

        // Handle if not
        if(!passVerified) return { success: false, message: 'Invalid credentials' };

        // Generate Token
        const token = await generateSessionToken();
        // Create Session

        if(!token) return { success: false, message: 'Error generating token' };

        const session = await createSession(token, id);

        if(!session) return { success: false, message: 'Error creating session' };

        await setSessionTokenCookie(token, session.expiresAt);


    } catch (error) {
        console.error(error);
        return { success: false, message: `${error}` }
    }

    db.destroy();
    redirect("/user-page");

}