import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { db, query } from '../../../lib/db';
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserId, isAuthenticated } from '../../../common/auth/auth';


/* called upon request to /api/user */
const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    switch (req.method) {
        case "POST":
            const email = req.body.email as string;
            const password = req.body.password as string;

            const result = await db.query<Object[]>(`
                SELECT user_id
                FROM user
                WHERE email = ?
                `,
                [email]
            );

            // Not exactly sure what result would hold at this point

            if (result[0]) { // if result contains any value
                res.status(400).send("Email already in use, Please Sign In"); // probably a better status value than 400
                break;
            }

            // add new user to user table
            const response = await query(`
                INSERT INTO user(user_id,email,password)
                VALUES(NULL,?,?);
                `,
                [email, password]
            );

            res.status(200).send(response[0]);
            break;
        case "GET":
            if (!isAuthenticated(req)) {
                res.status(200).json({ authenticated: false });
            } else {
                const userId = getUserId(req);
                const result = await db.query<Object[]>(`
                            SELECT *
                            FROM user
                            WHERE user_id = ?
                        `,
                        [userId]
                    );
                const response = { authenticated: true, id: result[0] };
                res.status(200).json(response);
            }
        default:
            res.status(400).send("Not a valid request method");
            break;
    } 
};

export default handler;
