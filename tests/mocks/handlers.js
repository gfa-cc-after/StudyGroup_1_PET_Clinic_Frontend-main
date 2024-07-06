import { rest } from "msw"
import { getApiUrl } from "../utils"

export const handlers = [
  rest.post(getApiUrl("posts"), async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json({email: 'test@email.com', password: '1234', username: 'testuser'}));
  }),
];