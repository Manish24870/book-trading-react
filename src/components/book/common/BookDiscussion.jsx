import { useState } from "react";
import { Box, Text, Title, Card } from "@mantine/core";

import DiscussionQuestion from "./DiscussionQuestion";
import DiscussionForm from "./DiscussionForm";
import AnswerForm from "./AnswerForm";

const BookDiscussion = (props) => {
  const [opened, setOpened] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const handleClickOpen = (e, id) => {
    console.log(id);
    e.preventDefault();
    setQuestionId(id);
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Box>
      <Card withBorder>
        <Title order={4}>Book Discussion</Title>
        <DiscussionForm opened={opened} setOpened={setOpened} />

        <Box mt={30}>
          <Title order={5}>Previously asked questions</Title>
          {props.discussion.map((el) => (
            <DiscussionQuestion
              key={el._id}
              discussionItem={el}
              handleClickOpen={handleClickOpen}
            />
          ))}
        </Box>
      </Card>
      <AnswerForm opened={opened} setOpened={setOpened} questionId={questionId} />
    </Box>
  );
};

export default BookDiscussion;
