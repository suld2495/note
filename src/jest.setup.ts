import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handler } from './mocks/handlers';

const server = setupServer(...handler);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
