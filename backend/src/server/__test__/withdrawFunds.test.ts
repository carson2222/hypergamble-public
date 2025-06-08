import request from "supertest";
import express from "express";
import { withdrawFundsRoute } from "../routes/withdrawFunds.js";
import { CustomRequest } from "../../app.js";

const app = express();
app.use(express.json());

const mockWithdrawFunds = jest.fn();

jest.mock("../routes/withdrawFunds", () => ({
  withdrawFundsRoute: (router: express.Router) => {
    router.post("/withdrawFunds", (req, res) => mockWithdrawFunds(req, res));
  },
}));

describe("POST /withdrawFunds", () => {
  beforeAll(() => {
    withdrawFundsRoute(app);
  });

  beforeEach(() => {
    mockWithdrawFunds.mockClear();
  });

  it("should withdraw funds successfully", async () => {
    mockWithdrawFunds.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(200).json({ status: true });
    });

    const response = await request(app).post("/withdrawFunds").send({
      session: "validSessionToken",
      tokenType: "spot",
      tokenName: "USDC",
      amount: 100,
      wallet: "validWalletAddress",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
  });

  it("should return an error for missing session token", async () => {
    mockWithdrawFunds.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Missing session token" });
    });

    const response = await request(app).post("/withdrawFunds").send({
      tokenType: "spot",
      tokenName: "USDC",
      amount: 100,
      wallet: "validWalletAddress",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", false);
    expect(response.body).toHaveProperty("error", "Missing session token");
  });
});
