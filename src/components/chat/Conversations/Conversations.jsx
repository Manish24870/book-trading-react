import { Card, Box, Avatar, Text, ScrollArea, Tabs, Button, Flex, TextInput } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";

import Conversation from "./Conversation";
import OnlineUsers from "../OnlineUsers/OnlineUsers";

const Conversations = (props) => {
  return (
    <Box>
      <Flex gap={10} align="center" mb={24} mt={2} p="xs">
        <Avatar
          radius="xl"
          size="lg"
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
      <Tabs variant="default" value={props.selectedTab} onTabChange={props.setSelectedTab}>
        <Tabs.List>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
          <Tabs.Tab value="users">Users</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="messages">
          {" "}
          <ScrollArea sx={{ height: "75vh" }}>
            {props.conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                userInfo={props.userInfo}
                selectedConversation={props.selectedConversation}
                setSelectedConversation={props.setSelectedConversation}
              />
            ))}
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="users">
          <ScrollArea sx={{ height: "75vh" }}>
            <OnlineUsers
              userInfo={props.userInfo}
              onlineUsers={props.onlineUsers}
              setSelectedConversation={props.setSelectedConversation}
            />
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Conversations;
