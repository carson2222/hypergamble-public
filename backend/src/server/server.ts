import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import router from "./routes/index.js";
import { CustomRequest } from "../app.js";

export function initServer(pool: Pool, port: Number) {
  const app = express();

  app.use(cors());
  //   app.use(cors({
  //     origin: 'http://127.0.0.1:3000', // Allow this specific origin
  // }));
  app.use(express.json());

  // Pass the pool to every request
  app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    req.pool = pool;
    next();
  });

  // Add router after middleware
  app.use(router);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return app; // Return the app instance
}
