import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Title, Text, Card, Button, Modal, Group, Textarea } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";
import { createAnswer } from "../../../features/book/bookSlice";
import { successNotification } from "../../../utils/notification/showNotification";

const schema = Joi.object({
  answer: Joi.string().required().messages({
    "string.empty": "Answer is required",
  }),
});

const AnswerForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { error, isDiscussionError, isDiscussionSuccess, createAnswerLoading } = useSelector(
    (state) => state.book
  );

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      answer: "",
    },
  });

  useEffect(() => {
    if (isDiscussionError) {
      form.setErrors({
        answer: error.answer,
      });
    }
    if (isDiscussionSuccess) {
      props.setOpened(false);
    }
  }, [dispatch, isDiscussionError, isDiscussionSuccess]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(
        createAnswer({
          bookId: params.bookId,
          answerInfo: {
            questionId: props.questionId,
            answer: form.values.answer,
          },
        })
      );
    }
  };

  return (
    <Modal
      opened={props.opened}
      title={<Text weight={600}>Write an answer</Text>}
      onClose={() => props.setOpened(false)}
    >
      <Box>
        <form onSubmit={formSubmitHandler}>
          <Group grow>
            <Textarea
              minRows={2}
              maxRows={5}
              placeholder="Your answer"
              {...form.getInputProps("answer")}
            />
          </Group>
          <Button type="submit" loading={createAnswerLoading} mt={20}>
            Answer
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AnswerForm;
