import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

/* called upon request to api/holding/:portfolio_id */
const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    switch (req.method) {
        case "GET":
            const { portfolio_id } = req.query;
            const response = await query(`
                    SELECT ticker_symbol, company_name, SUM(quantity) AS total_quantity
                    FROM holding NATURAL JOIN stock
                    WHERE portfolio_id = ?
                    GROUP BY ticker_symbol
                `,
                portfolio_id
            );
            res.status(200).json(response);
            break;
        default:
            res.status(400).send("Not a valid request method");
            break;
    }
};

export default handler;
