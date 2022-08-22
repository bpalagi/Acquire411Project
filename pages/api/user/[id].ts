// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

/* called upon request to api/user/:id */
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
    const id = req.query.id as string;
    switch (req.method) {
        case "GET":
            const response = await query<Object[]>(`
                SELECT *
                FROM user
                WHERE user_id = ?
                `,
                [id]
            );
            res.status(200).json(response[0]);
            break;
        default:
            res.status(400).send("Not a valid request method");
            break;
    }
};

export default handler;
