import { useEffect } from "react";
import { Box, TextInput, Button } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

const schema = Joi.object({
  isbn: Joi.string().required().messages({
    "string.empty": "Isbn number is required",
  }),
});

const AddBookForm = (props) => {
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      isbn: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      console.log(form.values);
    }
  };

  return (
    <Box>
      <form></form>
    </Box>
  );
};

export default AddBookForm;
