import { Pool } from "pg";
import createNewUser from "../bot/createNewUser.js";
import addNewUser from "../../db/querries/addNewUser.js";
import { User } from "../../types/tables.js";

jest.mock("../../../src/db/querries/addNewUser");

describe("createNewUser", () => {
  let pool: Pool;

  beforeEach(() => {
    pool = new Pool();
    jest.clearAllMocks();
  });

  it("should create a new user and return the user data", async () => {
    const createdAt = new Date();
    const data: User = {
      id: 123,
      first_name: "John",
      language_code: "en",
      last_name: "Doe",
      username: "johndoe",
      created_at: createdAt,
    };

    (addNewUser as jest.Mock).mockResolvedValue({ rows: [data] });

    const result = await createNewUser(pool, data);

    // Check the properties except created_at
    expect(result).toEqual(data);

    // Check that created_at is a valid date
    expect(result).toHaveProperty("created_at");
    expect(new Date(result.created_at).toString()).not.toBe("Invalid Date");
  });
});
