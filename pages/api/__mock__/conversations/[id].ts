/**
 * mock api thats handle GET conversation[id] 
 * and POST new message to  convesation[id]
 * it is also memoize the retrived one's, this is not valid in real app
 */
import { NextApiRequest, NextApiResponse } from 'next'
import { generateSamples } from '../../../../utils/apiMocking/samples-convMessages';
import Message from '../../../../shapes/Message';
import moment from 'moment';
import { DateFormats } from '../../../../utils/utils';

// TODO: support pagination

// memoization map
const conversation = new Map<string | string[], Array<Message>>();

export default (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const convId = req.query.id;
        if (req.method === 'GET') {
            // get memoized conv
            if (conversation.has(convId))
                res.status(200).json(conversation.get(convId))
            else {
                // generate new conv.

                const samples = generateSamples();
                // save the samples to the comming convid to 
                // retreive it agin if requested
                conversation.set(convId, samples);

                // simulate latency
                setTimeout(() => {
                    res.status(200).json(samples);
                }, 1000 * 1)
            }
        }

        
        // handle sending message
        if (req.method === 'POST') {
            if (!conversation.has(convId))
                throw new Error(`conversation of id: ${convId} not found!`);

            const payload = JSON.parse(req.body);

            const msg = payload['newMessage'];

            if (!msg)
                throw new Error('newMessage is required!');

            // add it to the memoized map s
            conversation.get(convId).push({isMe: true, text: msg, timeStamp: moment().format(DateFormats.API_MSG_TIMESTAMP)});

            res.status(201).json({ newMessage: msg });
        }

    } catch (err) {
        res.status(400).json({ statusCode: 400, message: err.message })
    }
}
