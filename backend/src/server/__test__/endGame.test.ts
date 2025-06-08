import request from "supertest";
import express from "express";
import { endGameRoute } from "../routes/endGame.js";
import { CustomRequest } from "../../app.js";

const app = express();
app.use(express.json());

const mockEndGame = jest.fn();

jest.mock("../routes/endGame", () => ({
  endGameRoute: (router: express.Router) => {
    router.post("/endGame", (req, res) => mockEndGame(req, res));
  },
}));

describe("POST /endGame", () => {
  beforeAll(() => {
    endGameRoute(app);
  });

  beforeEach(() => {
    mockEndGame.mockClear();
  });

  it("should return 400 if validation fails", async () => {
    mockEndGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Validation error" });
    });

    const response = await request(app).post("/endGame").send({ session: "invalid", userInput: "invalid" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: false, error: "Validation error" });
  });

  it("should return 400 if session is invalid", async () => {
    mockEndGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Invalid session token" });
    });

    const response = await request(app)
      .post("/endGame")
      .send({ session: "invalidSession", userInput: "validInput" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: false, error: "Invalid session token" });
  });

  it("should return 400 if user data fails to load", async () => {
    mockEndGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Failed to load user data" });
    });

    const response = await request(app)
      .post("/endGame")
      .send({ session: "validSession", userInput: "validInput" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: false, error: "Failed to load user data" });
  });

  it("should return 400 if user has no active game", async () => {
    mockEndGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "User doesn't has an active game" });
    });

    const response = await request(app)
      .post("/endGame")
      .send({ session: "validSession", userInput: "validInput" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: false, error: "User doesn't has an active game" });
  });

  it("should return 200 and game result if successful", async () => {
    mockEndGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(200).json({ status: true, result: "Game result" });
    });

    const response = await request(app)
      .post("/endGame")
      .send({ session: "validSession", userInput: "validInput" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: true, result: "Game result" });
  });

  it("should return 500 if an unexpected error occurs", async () => {
    mockEndGame.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(500).json({ status: false, error: "Internal server error" });
    });

    const response = await request(app)
      .post("/endGame")
      .send({ session: "validSession", userInput: "validInput" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ status: false, error: "Internal server error" });
  });
});
