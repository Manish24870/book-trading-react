import { Card, Avatar, Text, Box, Flex } from "@mantine/core";

const Conversation = (props) => {
  return (
    <Card
      mb={12}
      px="xs"
      py="sm"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#FFFFFF",
        },
      })}
    >
      <Flex gap={8} justify="space-between" align="center">
        <Avatar
          radius="xl"
          size="md"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <Box>
          <Text color="primary" size="sm">
            John Smith
          </Text>
          <Text size="xs" color="dimmed">
            manish@gmail.com
          </Text>
        </Box>
        <Text size="xs" color="dimmed">
          7:10 PM
        </Text>
      </Flex>
    </Card>
  );
};

export default Conversation;
