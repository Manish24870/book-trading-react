import { Card, Avatar, Flex, Box, Text, Divider } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Messages from "./Messages/Messages";
import SendMessage from "../SendMessage";
import Loading from "../../common/Loading";
import { fetchConversationMessages } from "../../../features/chat/chatSlice";

const ChatBox = (props) => {
  const dispatch = useDispatch();
  const { conversationMessages, conversationMessagesLoading, fetchConversationMessagesSuccess } =
    useSelector((state) => state.chat);

  // Fetch current conversation messages
  useEffect(() => {
    if (props.selectedConversation) {
      dispatch(fetchConversationMessages(props.selectedConversation._id));
    }
  }, [props.selectedConversation]);

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
    const friendInfo = props.selectedConversation.members.find(
      (member) => member._id !== props.myProfile._id
    );
    console.log(friendInfo);
    renderMessages = (
      <div>
        <Flex gap={10} align="center" p="xs">
          <Avatar
            radius="xl"
            size="md"
            src={process.env.REACT_APP_BASE_IMAGE_URL + friendInfo.photo}
          />
          <Box>
            <Text color="primary">{friendInfo.name}</Text>
            <Text size="xs" color="dimmed">
              {friendInfo.email}
            </Text>
          </Box>
        </Flex>
        <Divider />
        <Flex direction="column" justify="space-between" sx={{ height: "70vh" }}>
          <Messages
            myProfile={props.myProfile}
            conversationMessages={conversationMessages}
            selectedConversation={props.selectedConversation}
          />
          <SendMessage
            selectedConversation={props.selectedConversation}
            socket={props.socket}
            myProfile={props.myProfile}
            conversations={props.conversations}
          />
        </Flex>
      </div>
    );
  }

  return (
    <Box py={10} mt={2}>
      {renderMessages}
    </Box>
  );
};

export default ChatBox;
