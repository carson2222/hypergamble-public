import request from "supertest";
import express from "express";
import path from "path";
import { staticFilesRoute } from "../routes/staticFiles.js";

const app = express();
staticFilesRoute(app);

describe("GET /static file", () => {
  it("should serve a static file", async () => {
    const response = await request(app).get("/test.txt");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });

  it("should return 404 for a non-existent file", async () => {
    const response = await request(app).get("/non-existent-file.txt");
    expect(response.status).toBe(404);
  });
});
