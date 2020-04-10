import React, { useMemo, useEffect, useState, useRef, ReactNode } from 'react';
import { List, ListItem, Flex, Spinner, Box } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';
import { getMessages } from '../store/actions';
import { createSelector } from 'reselect';
import { selectedUserSelector } from '../utils/selectors';
import { RootState } from '../store/store';
import Conversation from '../shapes/Conversation';
import MessageShape from '../shapes/Message';

const propTypes = {
    list: PropTypes.array
}

// temp
type Props = {
    [rest: string]: any
}

/**
 * state selector
 */
const stateSelector = createSelector(
    [
        selectedUserSelector,
        (state: RootState) => state.conversation.messages
    ],

    (selectedConv, messages) => { return { selectedConv, messages } }
);

const MessageViewer: React.FunctionComponent<Props> = ({ ...rest }) => {
    const dispatch = useDispatch();
    // to show loadig spinner
    const [loading, setLoading] = useState(false);
    // to scoroll to
    const contanerRef = useRef<HTMLElement>();

    // selected needed states
    const state: { selectedConv: Conversation, messages: Array<MessageShape> }
        = useSelector(stateSelector);


    /**
     * scroll down to the new message
     */
    useEffect(() => {
        if (!contanerRef.current)
            return;

        contanerRef.current.scrollTop = contanerRef.current.scrollHeight;

    }, [contanerRef.current, state.messages]);

    
    /**
     * fetch the conversation messeges when the
     * sletected conversation change
     */
    useEffect(() => {
        // not eq null or undefined
        if (state.selectedConv != null) {
            // show spinner
            setLoading(true);

            // remove spinner
            dispatch(getMessages(state.selectedConv.id, 0)).then(() => {
                setLoading(false);
            });

            // TODO: handle failer
        }

    }, [state.selectedConv.id, dispatch])

    /**
     * messegas list to render
     */
    const messages = useMemo(() => {
        if (!state.messages)
            return [];

        return state.messages.map((msg, idx) => (
            <ListItem key={idx}>
                <Message
                    isMe={msg.isMe}
                    text={msg.text}
                    timeStamp={msg.timeStamp}
                />
            </ListItem>
        ))
    }, [state.messages]);


    return (
        <Box
            overflowX="hidden"
            overflowY="auto"
            paddingX="1rem"
            pt="5"
            ref={contanerRef}
            {...rest}

        >
            {
                loading &&
                <Box width="100%" height="100%" display="flex" justifyContent="center" 
                    alignItems="center">
                    <Spinner size="lg" color="blue.500" m="auto" />
                </Box>
            }

            <List p="0" m="0" flexGrow={loading ? 0 : 1}>
                {messages}
            </List>
        </Box>
    )

}

MessageViewer.prototype = propTypes;

export default MessageViewer;
