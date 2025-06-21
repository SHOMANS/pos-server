import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.SALT_KEY) || 10; // Adjust if you want more security at the cost of speed
console.log(SALT_ROUNDS);
export const hashPassword = async (plainPassword: string): Promise<string> => {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
};

export const comparePassword = async (
  plainPassword: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plainPassword, hash);
  return match;
};
