import request from "supertest";
import { Pool } from "pg";
import { initServer } from "../server.js";
import { createPool } from "../../db/db.js";
import { PORT } from "../../data/constants.js";

describe("initServer", () => {
  let pool: Pool;
  let app: any;

  beforeAll(async () => {
    pool = await createPool();
    app = initServer(pool, PORT + 1); // Add 1 to the port to avoid conflicts with running docker container
  });

  afterAll(() => {
    pool.end();
  });

  it("should respond with 200 status for the root route", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
  });

  it("should pass the pool to every request", async () => {
    app.use((req, res) => {
      expect(req.pool).toBe(pool);
      res.status(200).send();
    });
    await request(app).get("/");
  });
});
