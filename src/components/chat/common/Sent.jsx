import { Avatar, Text, Box, Flex } from "@mantine/core";

import timeSince from "../../../utils/timeSince";

const Sent = (props) => {
  return (
    <Flex mb={12}>
      {/* <Avatar radius="xl" src={props.message.sender.profile.photo} /> */}
      <Avatar
        radius="xl"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      />
      <Box ml={8}>
        <Box
          sx={(theme) => ({
            backgroundImage: `linear-gradient(to right,${theme.colors.primary[6]},${theme.colors.primary[4]})`,
            borderRadius: 6,
            color: "white",
            fontSize: "90%",
            maxWidth: 400,
          })}
          px={16}
          py={8}
        >
          {/* {props.message.text} */}
          {"This is a message"}
        </Box>
        <Text size="xs" color="dimmed">
          {timeSince(new Date())}
          {/* {timeSince(new Date(props.message.createdAt))} */}
        </Text>
      </Box>
    </Flex>
  );
};

export default Sent;
