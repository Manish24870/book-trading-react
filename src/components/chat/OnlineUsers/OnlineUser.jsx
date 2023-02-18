import { Text, Box, Card, Avatar, Flex, Indicator } from "@mantine/core";
import { useDispatch } from "react-redux";

import { fetchConversation } from "../../../features/chat/chatSlice";

const OnlineUser = (props) => {
  const dispatch = useDispatch();
  const isOnlineIndex = props.onlineUsers.findIndex((user) => user.userId === props.user._id);

  // When user clicks on a conversation
  const getConversationHandler = () => {
    dispatch(
      fetchConversation({
        senderId: props.userInfo._id,
        receiverId: props.user._id,
      })
    );
  };

  return (
    <Card
      p="xs"
      mb={12}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#FFFFFF",
        },
      })}
      onClick={getConversationHandler}
    >
      <Flex align="center" gap={10}>
        <Avatar
          radius="xl"
          size="md"
          src={process.env.REACT_APP_BASE_IMAGE_URL + props.user.photo}
        />
        <Box>
          <Text size="sm" color="primary">
            {props.user.name}
          </Text>
          <Text size="xs" color="dimmed">
            {props.user.email}
          </Text>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          {isOnlineIndex >= 0 ? <Indicator color="green" position="middle-end" /> : null}
        </Box>
      </Flex>
    </Card>
  );
};

export default OnlineUser;
