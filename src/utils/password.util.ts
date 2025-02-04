import {hash, verify} from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password, 10);
}

export const verifyPassword = async (yourPassword: string,currentPassword: string): Promise<boolean> => {
    return await verify(yourPassword, currentPassword)
}