export type TUser = {
    id: number;
}

export type TSession = {
    id: string;
    userId: number;
    expiresAt: Date;
    token: string;
} 

export type TSessionValidationResult = { session: TSession; user: TUser } | { session: null; user: null };
