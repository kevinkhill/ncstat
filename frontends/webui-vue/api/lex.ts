import { NcLexer } from "@ncstat/parser";

import { NowRequest, NowResponse } from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
  const { input = '' } = request.query

  const lexer = new NcLexer({
    tokens: {
      EOF: false
    }
  });

  const tokens = lexer.tokens(input);

  response.status(200).send({ tokens })
}
