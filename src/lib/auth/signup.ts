"use server";

import { FieldPacket, RowDataPacket } from "mysql2";
import getDbConnection from "../db";

const db = await getDbConnection();

type TSignUp = {
    name: string;
    userName: string;
    email: string;
    hashedPassword: string;
}

export async function signUpUser(
    {
        name,
        userName,
        email,
        hashedPassword
    }: TSignUp
): Promise<boolean> {

    const [row]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT email FROM users WHERE email = ?",
        [email]
    );


    if(row.length > 0) return true;
    
    try {

        await db.execute(
            "INSERT INTO users (name, user_name, email, hashed_password) VALUES (?, ?, ?, ?)",
            [name, userName, email, hashedPassword]
        );
        console.log("INSIDE EXECUTE TRY");
        return false;

    } catch (error) {
        console.error(error);
        return true;

    }


}