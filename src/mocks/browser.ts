import { setupWorker } from 'msw';
import { handler } from './handlers';

export const worker = setupWorker(...handler);
export default {};
