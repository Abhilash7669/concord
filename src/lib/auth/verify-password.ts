import bcrypt from "bcryptjs";

type TVerifyPassword = {
    hashed_password: string;
    password: string;
}

export default async function verifyPassword(
    { 
        hashed_password,
        password 
    }: TVerifyPassword
) {

    const checkPassword = await bcrypt.compare(password, hashed_password);

    if(!checkPassword) return false;

    return true

};