import { Wallet } from "ethers";
import transferUSD from "../hyperlq/transferUSD.js";
import axios from "axios";

jest.mock("axios");

describe("transferUSD", () => {
  const privkey = Wallet.createRandom().privateKey;
  const destination = Wallet.createRandom().publicKey;
  const amount = 100;

  it("should transfer USD successfully", async () => {
    const mockedResponse = { data: "mocked_response" };
    (axios.post as jest.Mock).mockResolvedValue(mockedResponse);

    const result = await transferUSD(privkey, destination, amount);

    expect(result).toEqual(mockedResponse);
    expect(axios.post).toHaveBeenCalledWith("https://api.hyperliquid.xyz/exchange", expect.any(Object));
  });

  it("should handle errors", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("transfer error"));

    await expect(transferUSD(privkey, destination, amount)).rejects.toThrow("transfer error");
  });
});
