import React from 'react';
import { Box } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import ConversationCard from './ConversationCard';

const propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

type Props = {
    avatar: string,
    name: string
}


const MessageViewer: React.FunctionComponent<Props> = ({ avatar, name }: Props) => {
    return (
        <Box backgroundColor="blue.700" py="3" px="4" color="white">
            <ConversationCard avatar={avatar} name={name} />
        </Box>
    )

}

MessageViewer.propTypes = propTypes;

export default MessageViewer;
