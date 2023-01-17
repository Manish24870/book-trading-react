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
      </Card>
      <DiscussionQuestion />
      <DiscussionQuestion />
      <DiscussionQuestion />
    </Box>
  );
};

export default SellBookDiscussion;
