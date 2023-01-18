import { useEffect } from "react";
import { Box, Text, Button } from "@mantine/core";
import { BsQuestionCircle, BsArrowRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

const DiscussionQuestion = (props) => {
  const userId = useSelector((state) => state.user.user.id);
  const bookOwnerId = useSelector((state) => state.book.book.owner._id);
  let canAnswer;

  // Only show Answer button if current user is the owner
  if (userId == bookOwnerId) {
    canAnswer = (
      <Button
        size="xs"
        variant="outline"
        ml={10}
        onClick={(e) => props.handleClickOpen(e, props.discussionItem._id)}
      >
        Answer
      </Button>
    );
  }

  return (
    <Box mt={16}>
      <Text weight={500} mb={6} style={{ display: "flex", alignItems: "center" }}>
        <BsQuestionCircle size={20} color="red" style={{ marginRight: 10 }} />
        <span>{props.discussionItem.question}</span>
        {canAnswer}
      </Text>
      <Text style={{ display: "flex", alignItems: "center" }}>
        <BsArrowRightCircle color="green" size={20} style={{ marginRight: 10 }} />
        <span>{props.discussionItem.answer}</span>
      </Text>
    </Box>
  );
};

export default DiscussionQuestion;
