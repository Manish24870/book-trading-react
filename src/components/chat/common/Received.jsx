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
          {props.message.text}
        </Box>
        <Text size="xs" color="dimmed" sx={{ textAlign: "right" }}>
          {timeSince(new Date(props.message.createdAt))}
        </Text>
      </Box>
      <Avatar radius="xl" src={process.env.REACT_APP_BASE_IMAGE_URL + props.message.sender.photo} />
    </Flex>
  );
};

export default Received;
