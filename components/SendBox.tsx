import React, { useState, useCallback } from 'react';
import { Flex, Input, Button } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { postNewMessage } from '../store/actions';
import PopTypes from 'prop-types';

const propTypes = {
    convId: PopTypes.string.isRequired
}

type Props = {
    convId: string,
    [rest: string]: any
}

const SendBox: React.FunctionComponent<Props> = ({ convId, ...rest }: Props) => {
    const dispatch = useDispatch();
    const [newMsg, setNewMsg] = useState('');

    /**
     * form field change handler
     */
    const msgChangeHandler = useCallback((evt) => {
        setNewMsg(evt.target.value)
    }, []);

    const sendMsgHandler = useCallback((evt) => {
        // TODO: handle failer status
        dispatch(postNewMessage(convId, newMsg));

        // clear message input 
        setNewMsg('');

        evt.preventDefault();
    }, [dispatch, newMsg]);

    return (
        <form>
            <Flex py="3" px="4" {...rest} alignItems="center">
                <Button
                    type="submit"
                    isDisabled={!newMsg}
                    mr="2"
                    onClick={sendMsgHandler}
                    variantColor="blue"
                    size="sm"
                >Send</Button>

                <Input
                    onInput={msgChangeHandler}
                    value={newMsg}
                    borderRadius="md"
                    flexGrow={1}
                    size="sm"
                />

            </Flex>
        </form>
    )
}

SendBox.propTypes = propTypes;

export default SendBox;
