import request from "supertest";
import express from "express";
import { startGameRoute } from "../routes/startGame.js";
import { CustomRequest } from "../../app.js";

const app = express();
app.use(express.json());

const mockStartGame = jest.fn();

jest.mock("../routes/startGame", () => ({
  startGameRoute: (router: express.Router) => {
    router.post("/startGame", (req, res) => mockStartGame(req, res));
  },
}));

describe("POST /startGame", () => {
  beforeAll(() => {
    startGameRoute(app);
  });

  beforeEach(() => {
    mockStartGame.mockClear();
  });

  it("should start a game successfully", async () => {
    mockStartGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(200).json({ id: 1, initMessage: "Game started", initImg: "image.png" });
    });

    const response = await request(app).post("/startGame").send({
      type: "gameType1",
      amount: 100,
      session: "validSessionToken",
      tokenType: "spot",
      tokenName: "USDC",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("initMessage");
    expect(response.body).toHaveProperty("initImg");
  });

  it("should return an error for invalid session token", async () => {
    mockStartGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Invalid session token" });
    });

    const response = await request(app).post("/startGame").send({
      type: "gameType1",
      amount: 100,
      session: "invalidSessionToken",
      tokenType: "spot",
      tokenName: "USDC",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", false);
    expect(response.body).toHaveProperty("error", "Invalid session token");
  });
});
