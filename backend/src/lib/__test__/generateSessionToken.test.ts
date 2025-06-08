import generateSessionToken from "../generateSessionToken.js";

// filepath: /c:/Users/olafk/DEV/hyperlq-backend/src/lib/generateSessionToken.test.ts

test("generateSessionToken should return a string", () => {
  const token = generateSessionToken();
  expect(typeof token).toBe("string");
});

test("generateSessionToken should return a 64-character string", () => {
  const token = generateSessionToken();
  expect(token).toHaveLength(64);
});

test("generateSessionToken should return a hexadecimal string", () => {
  const token = generateSessionToken();
  const hexRegex = /^[0-9a-fA-F]+$/;
  expect(hexRegex.test(token)).toBe(true);
});
