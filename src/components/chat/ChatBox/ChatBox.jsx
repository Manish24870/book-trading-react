import { Card, Avatar, Flex, Box, Text, Divider } from "@mantine/core";

import Messages from "./Messages/Messages";
import SendMessage from "../SendMessage";

const ChatBox = (props) => {
  return (
    <Box py={10} mt={2}>
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
        <Messages />
        <SendMessage />
      </Flex>
    </Box>
  );
};

export default ChatBox;
