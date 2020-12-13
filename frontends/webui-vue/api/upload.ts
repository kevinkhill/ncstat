import { NcLexer, NcParser } from "@ncstat/parser";

import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse): NowResponse => {
  const parser = new NcParser({
    lexerConfig: {
      tokens: {
        EOF: false
      }
    }
  });

  try {
    const uploaded = req.body;
    const program = parser.parse(uploaded);

    return res.status(200).json({ notes: program.getNotes() });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
