import { useState } from "react";
import { Box, Text, Title, Card } from "@mantine/core";

import DiscussionQuestion from "./DiscussionQuestion";
import DiscussionForm from "./DiscussionForm";

const SellBookDiscussion = (props) => {
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const handleClickOpen = (e, id) => {
    e.preventDefault();
    setQuestionId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Card withBorder>
        <Title order={4}>Book Discussion</Title>
        <DiscussionForm />

        <Box mt={30}>
          <Title order={5}>Previously asked questions</Title>
          {props.discussion.map((el) => (
            <DiscussionQuestion key={el.id} discussionItem={el} />
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default SellBookDiscussion;
