import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

export const matchPassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  const match = await bcrypt.compare(plainTextPassword, hashedPassword);
  return match;
};
