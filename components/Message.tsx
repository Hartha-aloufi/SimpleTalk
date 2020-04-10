import React, { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';
import MessageProps from '../shapes/Message';
import { Box, Text, Flex } from '@chakra-ui/core';
import moment from 'moment';
import { DateFormats, timeFromNow } from '../utils/utils';

const propTypes = {
    text: PropTypes.string.isRequired,
    isMe: PropTypes.bool.isRequired, // refares to my messages 
    timeStamp: PropTypes.string.isRequired
    // ref: PropTypes.shape({ current: PropTypes.instanceOf(HTMLElement) })
}

const Message: React.FunctionComponent<MessageProps> = (props: MessageProps) => {
    const { text, isMe } = props;

    // convert time to relative formate
    const timeStamp = useMemo(() => {
        const timeStamp = moment(props.timeStamp, DateFormats.API_MSG_TIMESTAMP);

        return timeFromNow(timeStamp);

    }, [props.timeStamp]);

    return (
        <Flex marginBottom="4" ref={props.xref}>
            <Box
                display="inline-block"
                padding="6px 12px 7px"
                maxWidth="40%"
                ml={isMe ? '0' : 'auto'}
                backgroundColor={isMe ? 'blue.300' : 'gray.100'}
                borderRadius="md">
                <Text
                    fontSize="sm"
                    color={isMe ? 'white' : 'black.700'}
                    lineHeight="24px">
                    {text}

                    <Text
                        as="span"
                        display="block"
                        textAlign="end"
                        opacity={.7}
                        fontSize=".7rem"
                        lineHeight="10px"
                        minWidth="6rem"
                        >
                        {timeStamp}
                    </Text>
                </Text>
            </Box>
        </Flex>
    )
}

Message.propTypes = propTypes;

export default Message;
