import {hash, compare} from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password, 10);
}

export const verifyPassword = async (yourPassword: string,currentPassword: string): Promise<boolean> => {
    return await compare(yourPassword, currentPassword)
}