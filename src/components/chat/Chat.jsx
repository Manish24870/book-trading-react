import { useEffect, useState, useRef } from "react";
import { Card, Grid, Box, Title, Container } from "@mantine/core";
import { io } from "socket.io-client";

import Loading from "../common/Loading";
import Conversations from "./Conversations/Conversations";
import ChatBox from "./ChatBox/ChatBox";

const Chat = (props) => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8910");
  }, []);

  return (
    <Box mt={10}>
      <Container size="lg">
        <Card withBorder shadow="lg" p={0} sx={{ maxHeight: "85vh" }}>
          <Grid columns={12}>
            <Grid.Col
              span={3}
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[1],
              })}
            >
              <Conversations />
            </Grid.Col>
            <Grid.Col span={9}>
              <ChatBox />
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Chat;
