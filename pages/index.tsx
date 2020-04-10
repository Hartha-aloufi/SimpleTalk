import Head from 'next/head'
import { NextPage } from 'next';
import Conversations from '../components/Conversations';
import MessegesViewer from '../components/MessegesViewer';
import { getConversations } from '../store/actions';
import { Flex } from '@chakra-ui/core';
import SendBox from '../components/SendBox';
import ConversationHeader from '../components/ConversationHeader';

import { useSelector } from 'react-redux';
import { selectedUserSelector } from '../utils/selectors';


const Home: NextPage = () => {
  const selectedConv = useSelector(selectedUserSelector);

  return (
    <div className="container">
      <Head>
        <title>Simple Talk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex>
        <Conversations />
        <Flex direction="column" height='98vh' flexGrow={1}>
          <ConversationHeader avatar={selectedConv.avatar} name={selectedConv.name} />
          <MessegesViewer flexGrow={1} />
          <SendBox convId={selectedConv.id} />
        </Flex>
      </Flex>
    </div>
  )
};


Home.getInitialProps = async ({ store }) => {
  const dispatch: any = store.dispatch;
  await dispatch(getConversations(0))
}

export default Home
