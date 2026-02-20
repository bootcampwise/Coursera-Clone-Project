import request from "supertest";
import { expect } from "chai";
import app from "../src/app";

describe("Course API", () => {
  it("should return all courses", async () => {
    const res = await request(app).get("/api/v1/courses");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should return 404 for a nonexistent course", async () => {
    const res = await request(app).get("/api/v1/courses/nonexistent-id");
    expect(res.status).to.equal(404);
  });
});
