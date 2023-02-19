import { useEffect, useState, useRef } from "react";
import { Card, Grid, Box, Title, Container, Tabs } from "@mantine/core";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../common/Loading";
import Conversations from "./Conversations/Conversations";
import ChatBox from "./ChatBox/ChatBox";
import { fetchConversations, setArrivedMessage } from "../../features/chat/chatSlice";
import { successNotification, errorNotification } from "../../utils/notification/showNotification";

const Chat = (props) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { error, isError, conversations, isSuccess, fetchConversationsLoading } = useSelector(
    (state) => state.chat
  );
  const { myProfileLoading, myProfile } = useSelector((state) => state.profile);
  const [gotMessage, setGotMessage] = useState(null);
  const [selectedTab, setSelectedTab] = useState("messages");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://localhost:8910");
    dispatch(fetchConversations());

    // Get a new message
    socket.current.on("getMessage", (data) => {
      setGotMessage({
        sender: data.senderInfo,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Show error when error occurs
  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Error", message: error });
    }
  }, [error, isError]);

  // when we get a new message, check if it is part of the current conversation
  useEffect(() => {
    let isMemberIndex = null;
    isMemberIndex =
      gotMessage &&
      selectedConversation?.members.findIndex((member) => member._id === gotMessage.sender._id);

    if (isMemberIndex >= 0 && isMemberIndex !== null) {
      setArrivedMessage(gotMessage);
    }
  }, [gotMessage, selectedConversation]);

  // Add user on list when he connects
  useEffect(() => {
    if (myProfile) {
      socket.current.emit("addUser", myProfile?._id);
    }
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [myProfile]);

  let renderChat = <Loading />;

  if (fetchConversationsLoading || myProfileLoading) {
    renderChat = <Loading />;
  } else if (isSuccess && conversations) {
    renderChat = (
      <Grid columns={12}>
        <Grid.Col
          span={3}
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[2],
          })}
        >
          <Conversations
            conversations={conversations}
            userInfo={myProfile}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onlineUsers={onlineUsers}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <ChatBox
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            socket={socket}
            myProfile={myProfile}
            conversations={conversations}
          />
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Box mt={10}>
      <Container size="lg">
        <Card withBorder shadow="lg" p={0} sx={{ maxHeight: "85vh" }}>
          {renderChat}
        </Card>
      </Container>
    </Box>
  );
};

export default Chat;
