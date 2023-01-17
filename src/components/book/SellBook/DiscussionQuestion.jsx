import { Box, Text, Button } from "@mantine/core";
import { BsQuestionCircle, BsArrowRightCircle } from "react-icons/bs";

const DiscussionQuestion = (props) => {
  return (
    <Box mt={16}>
      <Text weight={500} mb={6} style={{ display: "flex", alignItems: "center" }}>
        <BsQuestionCircle size={20} color="red" style={{ marginRight: 10 }} />
        <span>Tell me the book page count</span>
      </Text>
      <Text style={{ display: "flex", alignItems: "center" }}>
        <BsArrowRightCircle color="green" size={20} style={{ marginRight: 10 }} />
        <span>That will be 329</span>
      </Text>
    </Box>
  );
};

export default DiscussionQuestion;
