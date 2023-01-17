import { Box, Text, TextInput, Button } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";

const schema = Joi.object({
  question: Joi.string().required().messages({
    "string.empty": "Question is required",
  }),
});

const DiscussionForm = (props) => {
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      question: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(form.values);
  };

  return (
    <Box mt={16}>
      <Text>Ask questions to the book owner</Text>
      <Box>
        <form onSubmit={formSubmitHandler}>
          <TextInput
            placeholder="Type your question here"
            {...form.getInputProps("question")}
            mb={16}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Box>
  );
};

export default DiscussionForm;
