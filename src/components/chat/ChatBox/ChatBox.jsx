import { Card, Avatar, Flex, Box, Text, Divider } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Messages from "./Messages/Messages";
import SendMessage from "../SendMessage";
import Loading from "../../common/Loading";
import { fetchConversationMessages } from "../../../features/chat/chatSlice";

const ChatBox = (props) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const { conversationMessages, conversationMessagesLoading, fetchConversationMessagesSuccess } =
    useSelector((state) => state.chat);

  // Fetch current conversation messages
  useEffect(() => {
    if (props.selectedConversation) {
      dispatch(fetchConversationMessages(props.selectedConversation._id));
    }
  }, [props.selectedConversation]);

  // Scroll message list to bottom
  useEffect(() => {
    scrollRef.current?.scrollInfoView({ behaviour: "smooth" });
  }, [props.selectedConversation, conversationMessages]);

  let renderMessages = <Loading />;

  if (conversationMessagesLoading) {
    renderMessages = <Loading />;
  } else if (!props.selectedConversation) {
    renderMessages = (
      <Text weight={500} size="md" align="center" color="primary">
        Select a conversation
      </Text>
    );
  } else if (conversationMessages && fetchConversationMessagesSuccess) {
    renderMessages = (
      <>
        <Flex gap={10} align="center" p="xs">
          <Avatar
            radius="xl"
            size="md"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          />
          <Box>
            <Text color="primary">John Smith</Text>
            <Text size="xs" color="dimmed">
              manish@gmail.com
            </Text>
          </Box>
        </Flex>
        <Divider />
        <Flex direction="column" sx={{ height: "70vh" }}>
          <Messages
            innerRef={scrollRef}
            myProfile={props.myProfile}
            conversationMessages={conversationMessages}
          />
          <SendMessage />
        </Flex>
      </>
    );
  }

  return (
    <Box py={10} mt={2}>
      {renderMessages}
    </Box>
  );
};

export default ChatBox;
