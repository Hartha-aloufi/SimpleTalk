/**
 * Bunch of shared selectors to select state from redux
 */


import { createSelector } from 'reselect';
import { RootState } from '../store/store';
import Conversation from '../shapes/Conversation';

const emptyConv : Conversation = {name: 'Chat User'};

/**
 * a selector to safley get the selected user
 */
export const selectedUserSelector = createSelector(
    (state: RootState) => state.conversation.selectedConv,
    (selectedConv) => selectedConv || emptyConv
)

/**
 * conversations list selector
 */
export const conversationsSelector = createSelector(
    (state: RootState) => state.conversation.list,
    // work around typescript validation
    list => list
)

