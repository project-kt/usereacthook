import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";
import { a } from "vitest/dist/suite-IbNSsUWN.js";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
