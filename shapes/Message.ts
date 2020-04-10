type Message = {
    text: string,
    isMe: boolean,
    timeStamp: string,
    xref?: React.MutableRefObject<HTMLElement>
}

export default Message;