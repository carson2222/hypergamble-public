import getWalletBalance from "../hyperlq/getWalletBalance.js";

describe("getWalletBalance", () => {
  it("should return the correct wallet balance", async () => {
    const address = "0x31ca8395cf837de08b24da3f660e77761dfb974b";

    const result = await getWalletBalance(address);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "perp", name: "USDC" }),
        expect.objectContaining({ type: "spot" }),
      ])
    );
  });

  it("should throw an error if an invalid address is provided", async () => {
    const address = "0xInvalidAddress";

    await expect(getWalletBalance(address)).rejects.toThrow("Invalid address provided");
  });
});
