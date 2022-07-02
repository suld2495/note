import { rest } from 'msw';

export const handler = [
  rest.post('/login', (_, res, ctx) => {
    return res(ctx.status(403), ctx.json({}));
  }),
];

export default {};
