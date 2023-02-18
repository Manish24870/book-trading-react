import { Card, Avatar, Text, Box, Flex } from "@mantine/core";

const Conversation = (props) => {
  const friendInfo = props.conversation.members.find((member) => member._id !== props.userInfo._id);

  return (
    <Card
      mb={12}
      px="xs"
      py="sm"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        cursor: "pointer",
        "&:hover": {
          backgroundColor:
            props.conversation._id === props.selectedConversation?._id
              ? "#FFFFFF"
              : theme.colors.gray[5],
        },
      })}
      onClick={() => props.setSelectedConversation(props.conversation)}
    >
      <Flex gap={8} justify="space-between" align="center">
        <Avatar
          radius="xl"
          size="md"
          src={process.env.REACT_APP_BASE_IMAGE_URL + friendInfo.photo}
        />
        <Box>
          <Text color="primary" size="sm">
            {friendInfo.name}
          </Text>
          <Text size="xs" color="dimmed">
            {friendInfo.email}
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
