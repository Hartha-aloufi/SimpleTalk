import moment, { Moment } from "moment";

export enum DateFormats {
    API_MSG_TIMESTAMP = 'DD-MM-YYYY hh:mm A'
}

export function timeFromNow(timeStamp: Moment) {
    const now = moment();

    // if less then 5 hours ago
    // return it in format [minutes/hours...] ago
    if (now.diff(timeStamp, 'hour') < 5)
        return timeStamp.fromNow();

    else
        return timeStamp.calendar()
}