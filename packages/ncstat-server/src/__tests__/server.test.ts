import request from "supertest";

import { app } from "../app";

const api = request(app.callback());

it("Hello world works", async () => {
  const response = await api.get("/");

  expect(response.status).toBe(200);
  expect(response.text).toBe("UP");
});
