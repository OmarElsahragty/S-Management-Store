import { hash, verify } from "argon2";

export const createHash = async (text: string): Promise<string> => hash(text);

export const verifyHash = async (hashed: string, text: string): Promise<boolean> => verify(hashed, text);
