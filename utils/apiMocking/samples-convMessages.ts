import moment from 'moment';
import dummyMessages from './dummy-messages';
import Message from '../../shapes/Message';
import { conversationsSelector } from '../selectors';
import { DateFormats } from '../utils';

/**
 * generate valid descending dates from now
 * by maximum 5 hours
 */
function* getRandomDeceDate() {
    const curMoment = moment();

    while (true) {
        yield curMoment.subtract(Math.random() * 60 * 60 * 5, 'seconds')
            .format(DateFormats.API_MSG_TIMESTAMP)
    }
}


/**
 * generator for randome avatars
 * using unsplash api
 */
function* messagesGenerator() {
    // create date generator
    const dateGenerator = getRandomDeceDate()

    while (true) {
        // random unber to select a dummy message
        const rnd1 = Math.ceil(Math.random() * (dummyMessages.length - 1));
        // random number to choose wheather this message is to me or not
        const rnd2 = Math.ceil(Math.random() * (dummyMessages.length - 1));
        // hack
        const randDate : any = dateGenerator.next().value;

        yield {
            text: dummyMessages[rnd1],
            isMe: rnd1 > rnd2,
            timeStamp: randDate.toString()
        }
    }
}



/**
 * function to generate random messages beetween 4 and 50 message
 */
export const generateSamples = (): Array<Message> => {
    // craete message generator
    const messageIt = messagesGenerator();
    
    const getNextMessage = (): Message => {
        //hack 
        const msg: any = messageIt.next().value

        return msg;
    };

    // generate dummy array
    // fill it with 0
    // map it to messages
    // revarese the messages order
    return Array(Math.floor(4 + Math.random() * 50))
        .fill(0)
        .map(() => getNextMessage())
        .reverse()
}