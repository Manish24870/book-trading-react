import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Group,
  Card,
  Container,
  Title,
  Box,
  Flex,
} from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { registerUser, reset } from "../../../features/user/userSlice";
import isEmpty from "../../../utils/isEmpty";
import {
  successNotification,
  errorNotification,
} from "../../../utils/notification/showNotification";

const schema = Joi.object({
  username: Joi.string().min(4).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username should have at least 4 letters",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Your name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  password: Joi.string().required().min(4).messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 4 letters",
  }),
});

const Register = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, userLoading, user, isError, isSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      if (typeof error === "string") {
        errorNotification("Error", error);
      } else if (typeof error === "object") {
        form.setErrors({
          username: error?.username,
          name: error?.name,
          email: error?.email,
          password: error?.password,
        });
      }
    }

    if (isSuccess && !isEmpty(user)) {
      successNotification({
        title: "Registration successful",
        message: `User ${user.username} registered successfully`,
      });
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, isSuccess, isError, user, error]);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const formSubmitHandler = (event) => {
    form.setErrors();
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(hasErrors, errors);
    if (!hasErrors) {
      dispatch(registerUser(form.values));
      console.log(form.values);
    }
  };

  return (
    <Box mt={40}>
      <Container size="sm">
        <Card withBorder mx="auto" shadow="xl" p={26}>
          <Title order={4} mb={16}>
            Register your account
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <TextInput
                label="Username"
                placeholder="Username"
                {...form.getInputProps("username")}
                mb={16}
              />

              <TextInput
                label="Fullname"
                placeholder="Your name"
                {...form.getInputProps("name")}
                mb={16}
              />
              <TextInput
                label="Email"
                placeholder="Your email"
                {...form.getInputProps("email")}
                mb={16}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
            </Flex>
            <Button mt={30} fullWidth type="submit" loading={userLoading}>
              Register
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
