/**
 * mock api thats handle GET conversations 
 */

// TODO: support pagination
import { NextApiRequest, NextApiResponse } from 'next'
import { generateSamples } from '../../../../utils/apiMocking/samples-conversations';

const totalCount = 40;
const pageCount = 5;
const firstCount = 20;

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const page = +req.query.page
        const data = generateSamples(page === 1 ? firstCount : pageCount);

        setTimeout(() => {
            // return static samples
            res.status(200).json({ conversations: data, totalCount, itemsCount: data.length })
        }, 1000)

    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
