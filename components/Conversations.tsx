import React, { useMemo, useEffect, useCallback } from 'react';
import { List, ListItem, Spinner, Box} from '@chakra-ui/core';
import ConvCard from './ConversationCard';

import PropTypes from 'prop-types';
import { SELECT_CONVERSATION } from '../store/actions/actions';
import { getConversations } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUserSelector, conversationsSelector } from '../utils/selectors';
import { createSelector } from 'reselect';
import Conversation from '../shapes/Conversation';
import { RootState } from '../store/store';
import useInfinitScroll from '../hooks/useInfinitScroll';

const propTypes = {
    list: PropTypes.array
}

type Props = {
}

/** Item style when it hovred */
const hoverItemStyle = {
    backgroundColor: 'gray.100',
    cursor: 'pointer'
}
/** Item style when it active/selected */
const activeItemStyle = {
    ...hoverItemStyle,
    borderColor: "blue.500",
}

/**
 * utility to validate on style props
 */
const is = (expretion, objVal) => {
    if (expretion)
        return objVal;

    return {}
}

const stateSelector = createSelector(
    [
        selectedUserSelector,
        conversationsSelector,
    ],

    (selectedConv, convList) => { return { selectedConv, convList } }
)

const Conversations: React.FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const state: { selectedConv: Conversation, convList: Array<Conversation> }
        = useSelector(stateSelector)

    const fetchConversationsHandler = useCallback((page) => {
        return dispatch(getConversations(page));
    }, []);

    const { setLastElement, loading } = useInfinitScroll(fetchConversationsHandler, null);

    /**
     * Conversation click handler
     * select the conv and fetch messages if needed
     */
    const convSelectHanlder = useCallback((convId) => {
        // TODO: wrap the action so to be strongle typed
        dispatch({ type: SELECT_CONVERSATION, convId });
    }, [dispatch]);


    const convList = useMemo(() => {
        if (!state.convList)
            return []

        return state.convList.map((conv, idx) => (
            <ListItem
                key={idx}
                transition=".2s"
                _hover={hoverItemStyle}
                marginBottom="0px"
                borderLeft="4px"
                borderRadius="md"
                borderColor="white"
                py="2"
                px="1"
                {
                // selected 
                ...is(state.selectedConv.id === conv.id, activeItemStyle)
                }

                //TODO: remove function createion or memoize it
                onClick={() => convSelectHanlder(conv.id)}
            >
                {
                    idx + 1 === state.convList.length ?
                        <ConvCard
                            {...conv}
                            // set last element every time it changes
                            ref={node => setLastElement(node)}
                        />
                        :
                        <ConvCard
                            {...conv}
                        // set last element every time it changes
                        />
                }
            </ListItem>
        ))
    }, [state.convList, convSelectHanlder, state.selectedConv]);

    return (
        <List
            className="conversations-list"
            maxWidth="285px"
            width={'100%'}
            borderRight="1px"
            borderColor="gray.400"
            p="0"
            pr="3"
            m="0"
            maxH="100vh"
            overflowY="auto"
        >

            {convList}

            {
                loading &&
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="64px">
                    <Spinner  color="blue.500" m="auto" />
                </Box>
                
            }
        </List>
    )

}

Conversations.prototype = propTypes;

export default Conversations;
