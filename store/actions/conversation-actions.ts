import { fetchWrapper } from '../../utils/apiMocking/api';
import {
    FETCH_CONVERSATIONS_FAIL,
    FETCH_CONVERSATIONS_START,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_START,
    FETCH_MESSAGES_SUCCESS,
    SEND_MSSSAGE_START,
    SEND_MSSSAGE_FAIL,
    SEND_MSSSAGE_SUCCESS,
} from './actions';
import { AppThunk } from '../../shapes/Thunk'



/*************** CONVERSATIONS LIST ********************/
const fetchConvStart = () => {
    return {
        type: FETCH_CONVERSATIONS_START,
    }
}

const fetchConvFail = (error) => {
    return {
        type: FETCH_CONVERSATIONS_FAIL,
        error
    }
}

const fetchConvSuccess = (conversations) => {
    return {
        type: FETCH_CONVERSATIONS_SUCCESS,
        conversations
    }
}

/**
 * Async action to fetch conversations list from the api
 * @param page requested page
 */
export const getConversations = (page: number): AppThunk => {
    return dispatch => {
        dispatch(fetchConvStart());

        // returning promise so the dispatcher could update locally
        return fetchWrapper(`http://localhost:3000/api/__mock__/conversations?page=${page}`,)
            .then(data => {
                dispatch(fetchConvSuccess(data.conversations));
                return data
            })
            .catch(e => {
                return dispatch(fetchConvFail(e.message));
            })
    }
}



/*************** CONVERSATION MESSAGES ********************/
const fetchMessagesStart = () => {
    return {
        type: FETCH_MESSAGES_START,
    }
}

const fetchMessagesFail = (error) => {
    return {
        type: FETCH_MESSAGES_FAIL,
        error
    }
}

const fetchMessagesSuccess = (messages) => {
    return {
        type: FETCH_MESSAGES_SUCCESS,
        messages
    }
}

/**
 * Async action to fetch messages from the api
 * @param convId conversation id to retrieve
 * @param page request page
 */
export const getMessages = (convId: string, page: number) => {
    return dispatch => {
        dispatch(fetchMessagesStart());

        // return promise so dispatcher could update locally
        return fetchWrapper(`http://localhost:3000/api/__mock__/conversations/${convId}`)
            .then(data => {
                dispatch(fetchMessagesSuccess(data));
                return data
            })
            .catch(e => {
                return dispatch(fetchMessagesFail(e.message));
            })
    }
}



/*************** SEND MESSAGES ********************/
const SendMessageStart = () => {
    return {
        type: SEND_MSSSAGE_START,
    }
}

const SendMessageFail = (error) => {
    return {
        type: SEND_MSSSAGE_FAIL,
        error
    }
}

const SendMessageSuccess = (newMsg, convId) => {
    return {
        type: SEND_MSSSAGE_SUCCESS,
        newMsg,
        convId
    }
}

/**
 * Async action to fetch messages from the api
 * @param convId 
 * @param newMessage 
 */
export const postNewMessage = (convId: string, newMessage: string) => {
    return dispatch => {
        dispatch(SendMessageStart());

        const payload = {
            newMessage: newMessage
        };

        return fetchWrapper(`http://localhost:3000/api/__mock__/conversations/${convId}`,
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        )
            .then(data => {
                dispatch(SendMessageSuccess(data.newMessage, convId));
                return data.newMessage
            })
            .catch(e => {
                dispatch(SendMessageFail(e.message));
            })
    }
}