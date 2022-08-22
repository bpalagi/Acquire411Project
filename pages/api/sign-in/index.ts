import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';
import jwt from "jsonwebtoken";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    switch (req.method) {
        case "POST":
            const { email, password } = req.body;

            const response = await query<any[]>(`
                    SELECT user_id, email
                    FROM user
                    WHERE email = ? AND password = ?
                `,
                [email, password]
            );

            const user = response[0];
            if (user) {
                // create session token signed with user id
                const token = jwt.sign({ "id": user.user_id }, "secretToken", {
                    expiresIn: 1200, /* 20 minutes until token expires */
                });
                const results = { authenticated: true, token: token, user: user };
                res.status(200).json(results);
            } else {
                const results = { authenticated: false };
                res.status(200).json(results);
            }
            break;
        default:
            res.status(400).send("Not a valid request method");
            break;
    }
};

export default handler;
