import React from 'react';
import { Box, Flex, Avatar, Text } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import ConversationShape from '../shapes/Conversation';

const propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    timeStamp: PropTypes.string,
    id: PropTypes.string
}


const ConversationCard = React.forwardRef((props: ConversationShape, ref?: React.Ref<HTMLElement>) => {
    const { name, avatar, lastMessage, timeStamp, ...rest } = props;

    return (
        // since this is a shared component
        // the color will be inherented
        // from the parent container by using "currentcolor"
        <Flex {...rest} alignItems="center" color="currentcolor" ref={ref} style={{backgroundColor: ref ? "red": 'none'}} >
            <Avatar src={avatar} />
            <Box width="calc(100% - 60px)" ml="3" flexGrow={1} >
                <Flex>
                    <Text fontWeight="bold" m="0">
                        {name}
                    </Text>
                    <Text as="abbr" ml="auto" fontWeight="light" fontSize="small" color="gray.500">
                        {timeStamp}
                    </Text>
                </Flex>
                <Text fontSize="sm" m="0" color="gray.500" isTruncated>{lastMessage}</Text>
            </Box>
        </Flex>
    )
})

ConversationCard.propTypes = propTypes;

export default ConversationCard;