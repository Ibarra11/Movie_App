import { server } from "./lib/test/server";
import "@testing-library/jest-dom";
beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());
