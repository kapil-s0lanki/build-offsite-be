// src/utils/hashPassword.ts
import * as bcrypt from 'bcrypt';

export async function generateSalt() {
  const saltRounds = 10; // You can adjust the number of rounds for more or less security
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
}

export async function authentication(salt: string, password: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

export async function hashRefreshToken(password: string, saltRounds = 10): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function hashedPassword(password: string, saltRounds = 10): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPasswordString: string): Promise<boolean> {
  try {
    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPasswordString);
    return isMatch;
  } catch (error) {
    // Handle potential errors
    throw new Error(`Error comparing password: ${error.message}`);
  }
}
