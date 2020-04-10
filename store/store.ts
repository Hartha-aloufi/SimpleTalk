import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {MakeStore} from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import conversationReducer, {ConvState} from './reducers/conversation-reducer';

/**
 * Root redux state type
 */
export type RootState = {
    conversation: ConvState
} 

const rootReducer = combineReducers({
    conversation: conversationReducer
});

export const makeStore : MakeStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export default makeStore;