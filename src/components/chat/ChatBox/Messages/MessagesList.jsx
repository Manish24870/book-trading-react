import { Box, Text } from "@mantine/core";

import Sent from "../../common/Sent";
import Received from "../../common/Received";

const MessagesList = (props) => {
  return (
    <Box>
      <Sent />
      <Received />
      <Received />
      <Received />
      <Received />
      <Sent />
      <Sent />
      <Sent />
      <Sent />
    </Box>
  );
};

export default MessagesList;
