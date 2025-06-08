import crypto from "crypto";

export default function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex"); // Generates a 64-character hexadecimal string
}
