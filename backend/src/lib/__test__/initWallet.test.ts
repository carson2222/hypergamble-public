import { Wallet } from "ethers";
import initWallet from "../arbitrum/initWallet.js";
import { HDNodeWallet } from "ethers";

let wallet: HDNodeWallet;

beforeAll(() => {
  wallet = initWallet();
});

test("initWallet should return a Wallet instance", () => {
  expect(wallet).toBeInstanceOf(HDNodeWallet);
});

test("initWallet returned address should be a string", () => {
  expect(typeof wallet.address).toBe("string");
});

test("initWallet returned address should start with '0x'", () => {
  expect(wallet.address.startsWith("0x")).toBe(true);
});

test("initWallet returned private key should be a string", () => {
  expect(typeof wallet.privateKey).toBe("string");
});

test("initWallet returned private key should start with '0x'", () => {
  expect(wallet.privateKey.startsWith("0x")).toBe(true);
});

test("initWallet returned mnemonic should be an object", () => {
  expect(typeof wallet.mnemonic).toBe("object");
});

test("initWallet returned mnemonic should have a phrase property", () => {
  expect(wallet.mnemonic).toHaveProperty("phrase");
});
