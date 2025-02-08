"use server"
import { cookies } from "next/headers";
import { cache } from "react";
import { TSessionValidationResult } from "../types/auth/session/session-type";
import { validateSessionToken } from "./session-auth";


export const getCurrentSession = cache(async (): Promise<TSessionValidationResult> => {

    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;
    const tokenValue = token as string;

    if(!token) return { session: null, user: null };

    const data = await validateSessionToken(tokenValue);
    return data;

});