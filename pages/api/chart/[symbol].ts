// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

/* called upon request to api/chart/:symbol */
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
    switch (req.method) {
        case "GET":
            const { symbol, interval, range } = req.query;

            const response = await axios.get(`https://query1.finance.yahoo.com/v7/finance/chart/${symbol}`, {
                params: {
                    range,
                    interval
                },
            });

            res.status(200).json(response.data.chart.result[0]);
            break;
        default:
            res.status(400).send("Not a valid request method");
            break;
    }
};

export default handler;
