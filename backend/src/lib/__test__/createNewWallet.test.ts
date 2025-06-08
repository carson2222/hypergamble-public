import createNewWallet from "../bot/createNewWallet.js";
import addNewWallet from "../../db/querries/addNewWallet.js";
import { Pool } from "pg";
import initWallet from "../arbitrum/initWallet.js";

// Mock dependencies
jest.mock("../arbitrum/initWallet");
jest.mock("../../db/querries/addNewWallet");

describe("createNewWallet", () => {
  it("should create a new wallet and return the public key", async () => {
    const pool = new Pool(); // Mocked pool object
    const userId = 1;
    const mockWallet = { address: "0x123", privateKey: "privateKey123" };
    const mockRows = [{ public_key: "publicKey123" }];

    (initWallet as jest.Mock).mockReturnValue(mockWallet);
    (addNewWallet as jest.Mock).mockResolvedValue({ rows: mockRows });

    const pubKey = await createNewWallet(pool, userId);

    expect(initWallet).toHaveBeenCalled();
    expect(addNewWallet).toHaveBeenCalledWith(pool, userId, mockWallet.address, mockWallet.privateKey);
    expect(pubKey).toBe("publicKey123");
  });
});
