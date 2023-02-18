import { Card, Box, Avatar, Text, ScrollArea, Button, Flex, TextInput } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";

import Conversation from "./Conversation";

const Conversations = (props) => {
  return (
    <Box>
      <Flex gap={10} align="center" mb={24} mt={20} p="xs">
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
      <Box mb={24}>
        <TextInput mx={10} placeholder="Search" radius="lg" icon={<IoIosSearch size={20} />} />
      </Box>
      <ScrollArea sx={{ height: "75vh" }}>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </ScrollArea>
    </Box>
  );
};

export default Conversations;
