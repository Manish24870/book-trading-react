import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, TextInput, Button } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { reset, createQuestion } from "../../../features/book/bookSlice";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notification/showNotification";

const schema = Joi.object({
  question: Joi.string().required().messages({
    "string.empty": "Question is required",
  }),
});

const DiscussionForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { error, isDiscussionError, isDiscussionSuccess, createQuestionLoading } = useSelector(
    (state) => state.book
  );

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      question: "",
    },
  });

  useEffect(() => {
    // If discussion error occurs
    if (isDiscussionError) {
      form.setErrors({
        question: error.question,
      });
    }

    if (isDiscussionSuccess) {
      successNotification({
        title: "Success",
        message: "Discussion updated successfully",
      });
      form.setFieldValue("question", "");
    }
    // dispatch(reset());
  }, [dispatch, isDiscussionError, isDiscussionSuccess]);

  // When user submits the discussion form
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(createQuestion({ bookId: params.bookId, questionInfo: form.values }));
    }
  };

  return (
    <Box mt={16}>
      <Text>Ask questions to the book owner</Text>
      <Box mt={6}>
        <form onSubmit={formSubmitHandler}>
          <TextInput
            placeholder="Type your question here"
            {...form.getInputProps("question")}
            mb={16}
          />
          <Button loading={createQuestionLoading} type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default DiscussionForm;
