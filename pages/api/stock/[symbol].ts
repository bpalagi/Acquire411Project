// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

/* called upon request to api/stock/:symbol */
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
    switch (req.method) {
        case "GET":
            const symbol = req.query.symbol as string;

            // TODO: Write a query that grabs every stock
            // that contains the letters inputted as a
            // substring in the symbol variable above. Put
            // the results in response.
            const response = await query(`
                    SELECT ticker_symbol, name
                    FROM stock NATURAL JOIN company
                    WHERE ticker_symbol LIKE ?
                `,
                [symbol+"%"]
            );

            res.status(200).json(response);
            break;
        default:
            res.status(400).send("Not a valid request method");
            break;
    }
};

export default handler;
