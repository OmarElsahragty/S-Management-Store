import { hash, verify } from "argon2";

export const createHash = async (text: string): Promise<string> => {
  return hash(text);
};

export const verifyHash = async (hashed: string, text: string): Promise<boolean> => {
  return verify(hashed, text);
};
