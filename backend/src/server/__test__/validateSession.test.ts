import request from "supertest";
import express from "express";
import { validateSessionRoute } from "../routes/validateSession.js";
import { CustomRequest } from "../../app.js";

const app = express();
app.use(express.json());

const mockValidateSession = jest.fn();

jest.mock("../routes/validateSession", () => ({
  validateSessionRoute: (router: express.Router) => {
    router.get("/validateSession", (req, res) => mockValidateSession(req, res));
  },
}));

describe("GET /validateSession", () => {
  beforeAll(() => {
    validateSessionRoute(app);
  });

  beforeEach(() => {
    mockValidateSession.mockClear();
  });

  it("should validate session successfully", async () => {
    mockValidateSession.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(200).json({
        status: true,
        data: {
          user: { id: 1, name: "John Doe" },
          session: { token: "validSessionToken", is_valid: true },
          wallet: "walletPublicKey",
          games: [{ id: 1, name: "Game 1" }],
        },
      });
    });

    const response = await request(app).get("/validateSession").query({
      session_token: "validSessionToken",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("session");
    expect(response.body.data).toHaveProperty("wallet");
    expect(response.body.data).toHaveProperty("games");
  });

  it("should return an error for missing session token", async () => {
    mockValidateSession.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Missing session token" });
    });

    const response = await request(app).get("/validateSession");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", false);
    expect(response.body).toHaveProperty("error", "Missing session token");
  });

  it("should return an error for invalid session token", async () => {
    mockValidateSession.mockImplementation((req: CustomRequest, res: express.Response) => {
      res.status(400).json({ status: false, error: "Invalid session token" });
    });

    const response = await request(app).get("/validateSession").query({
      session_token: "invalidSessionToken",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", false);
    expect(response.body).toHaveProperty("error", "Invalid session token");
  });
});
