import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';
import { getUserId, isAuthenticated } from '../../../common/auth/auth';

/* called upon request to api/user/:id */
const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    switch (req.method) {
        case "GET": {
            if (!isAuthenticated(req)) {
                res.status(401).send("Not authenticated!");
            } else {
                const userId = getUserId(req);
                const results = await query(`
                        SELECT *
                        FROM portfolio
                        WHERE user_id = ?
                    `,
                    [userId]
                );
                res.status(200).json(results);
            }
            break;
        }
        case "POST": {
            if (!isAuthenticated(req)) {
                res.status(401).send("Not authenticated!");
            } else {
                const userId = getUserId(req);
                const { name, cash } = req.body;
                const results = await query(`
                        INSERT INTO portfolio(portfolio_id,user_id,name,cash) VALUES (NULL,?,?,?);
                    `,
                    [userId,name,cash]
                );
                res.status(200).json(results);
            }
            break;
        }
        default:
            res.status(400).send("Not a valid request method");
            break;
    }
};

export default handler;
