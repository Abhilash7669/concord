import bcrypt from "bcryptjs";

export default async function hashPassword(password: FormDataEntryValue | string): Promise<string> {

    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashPassword = await bcrypt.hash(password as string, salt);
    return hashPassword;

}

