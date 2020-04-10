type Conversation = {
    name: string,
    avatar?: string,
    id?: string,
    lastMessage?: string,
    timeStamp?: string,
    [rest: string]: any
}

export default Conversation;