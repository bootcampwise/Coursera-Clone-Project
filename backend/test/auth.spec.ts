import request from "supertest";
import { expect } from "chai";
import app from "../src/app";

describe("Auth API", () => {
  it("should return 401 for invalid login", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "nonexistent@example.com",
      password: "wrongpassword",
    });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("message");
  });

  it("should return 400 for registration with missing fields", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email: "test@example.com",
    });

    expect(res.status).to.equal(400);
  });
});
