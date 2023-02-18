import { Avatar, Text, Box, Flex } from "@mantine/core";

import timeSince from "../../../utils/timeSince";

const Received = (props) => {
  return (
    <Flex justify="right" mb={12}>
      <Box mr={8}>
        {" "}
        <Box
          sx={(theme) => ({
            backgroundImage: `linear-gradient(to right,${theme.colors.gray[2]},${theme.colors.gray[4]})`,
            borderRadius: 6,
            fontSize: "90%",
          })}
          px={16}
          py={8}
        >
          {"This is a message"}
          {/* {props.message.text} */}
        </Box>
        <Text size="xs" color="dimmed" sx={{ textAlign: "right" }}>
          {timeSince(new Date())}
        </Text>
      </Box>
      {/* <Avatar radius="xl" src={props.message.sender.profile.photo} /> */}
      <Avatar
        radius="xl"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      />
    </Flex>
  );
};

export default Received;
