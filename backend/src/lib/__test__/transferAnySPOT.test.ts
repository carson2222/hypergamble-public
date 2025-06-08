import { Wallet } from "ethers";
import transferAnySPOT from "../hyperlq/transferAnySPOT.js";
import axios from "axios";
import { spotTokens } from "../../data/tokens.js";

jest.mock("axios");

describe("transferAnySPOT", () => {
  const privkey = Wallet.createRandom().privateKey;
  const destination = Wallet.createRandom().publicKey;
  const amount = 100;
  const tokenName = spotTokens[0];

  it("should transfer SPOT tokens successfully", async () => {
    const mockedResponse = { data: "mocked_response" };
    (axios.post as jest.Mock).mockResolvedValue(mockedResponse);

    const result = await transferAnySPOT(privkey, destination, amount, tokenName);

    expect(result).toEqual(mockedResponse);
    expect(axios.post).toHaveBeenCalledWith("https://api.hyperliquid.xyz/exchange", expect.any(Object));
  });
});
