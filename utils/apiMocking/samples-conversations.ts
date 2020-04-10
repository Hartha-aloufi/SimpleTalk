import Conversation from "../../shapes/Conversation";
import uuid from 'uuid';

const firstName = ['Hartha', 'Omar', 'Ahmad', 'Khaled', 'Shadeed', 'Tareq', 'Baraa', 'Abdullah', 'Anas', 'Mahdi']
const lastName = ['Aloufi', 'Altamimi', 'Obedat', 'Zaghmori', 'Foqaha', 'Arrar', 'Rasheed', 'Sheekh', 'Delq', 'Hamdan'];

/**
 * generator for randome avatars
 * using unsplash api
 */
function* convGenerator() {
    // conter to construct uneuqe urls
    let cnt = 0;
    let id = 100;


    while (true) {
        const fName = firstName[Math.ceil(Math.random() * firstName.length - 1)]
        const lName = lastName[Math.ceil(Math.random() * lastName.length - 1)]
  
        yield {
            id: id++,
            name: `${fName} ${lName}`,
            avatar: `https://source.unsplash.com/${48 + cnt}x${48 + cnt}/?person`,
            timeStamp: '2020-1-1',
            lastMessage: 'Hello! are you there'
        }

        cnt++;
        if (cnt > 15)
            cnt = 0;
    }
}


/**
 * function to generate random conversations
 */
export const generateSamples = (count: number): Array<Conversation> => {
    // craete message generator
    const convIt = convGenerator();

    const generateNextConv = (): Conversation => {
        //hack 
        const msg: any = convIt.next().value

        return msg;
    };

    // generate dummy array
    // fill it with 0
    // map it to messages
    // revarese the messages order
    return Array(count)
        .fill(0)
        .map(() => generateNextConv())
}