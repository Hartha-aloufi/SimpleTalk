import * as actionTypse from '../actions/actions';
import Conversation from '../../shapes/Conversation';
import messages from '../../shapes/Message';

/**
 * Conversation state type
 */
export type ConvState = {
    list: Array<Conversation>,
    selectedConv: Conversation,
    messages: Array<messages>
}

const initialState: ConvState = {
    list: [],
    messages: null,
    selectedConv: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypse.SELECT_CONVERSATION:
            return {
                ...state,
                // search for selected conv
                selectedConv: state.list.find(conv => conv.id === action.convId)
            }

        case actionTypse.FETCH_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                list: [...state.list, ...action.conversations],
                // null or undefined
                // if no conv selected then select the first one by default
                selectedConv: state.selectedConv == null ? action.conversations[0]
                    : state.selectedConv
            }

        case actionTypse.FETCH_MESSAGES_START:
            return {
                ...state,
                // clear messages on new fetch
                messages: []
            }
        case actionTypse.FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.messages
            }

        case actionTypse.SEND_MSSSAGE_SUCCESS:
            return {
                ...state,
                // add new message to the collection
                messages: [...state.messages, { text: action.newMsg, isMe: true }],
                // update last message for the current conv
                list: updateLastMessage(state.list, action.convId, action.newMsg)
            }
        default:
            return state;
    }
}



/**
 * handle update on conversation list last message
 * 
 * @param list conversations list
 * @param id conversation id to update
 * @param newMessage new last_message   
 */
const updateLastMessage = (list: Array<Conversation>, id: string, newMessage: string)
    : Array<Conversation> => {

    return list.map(conv => {
        // if it is the conv we want to update
        // then create new conv object
        if (conv.id === id) {
            return {...conv, lastMessage: newMessage}
        }

        return conv
    })
}

export default reducer;