// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom";
// add this to your setupFilesAfterEnv config in jest so it's imported for every test file
import { worker } from "./mocks/browser";

beforeAll(() => worker.start());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
