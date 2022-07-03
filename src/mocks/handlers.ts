import { rest } from 'msw';

export const handler = [
  rest.post('/login', (req, res, ctx) => {
    const user = {
      userId: '정상 아이디',
      password: '정상 비밀번호'
    };

    const { userId, password } = JSON.parse(req.body);

    if (user.userId === userId && user.password === password) {
      return res(ctx.json({
        userId: '로그인 된 아이디',
        name: '로그인 된 이름'
      }));
    }
    return res(ctx.status(403), ctx.json({}));
  }),
];

export default {};
