import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, PasswordInput, Button, Card, Container, Title, Box, Flex } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { loginUser, reset } from "../../../features/user/userSlice";
import isEmpty from "../../../utils/isEmpty";
import {
  successNotification,
  errorNotification,
} from "../../../utils/notification/showNotification";

const schema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username or email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";

  const { error, userLoading, user, isError, isSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    // Check for login error
    if (isError) {
      if (typeof error === "string") {
        errorNotification({ title: "Login Error", message: error });
      } else if (typeof error === "object") {
        form.setErrors({
          username: error.username,
          password: error.password,
        });
      }
    }

    // Check for successful login
    if (isSuccess && !isEmpty(user)) {
      successNotification({
        title: "Login successful",
        message: "Logged in succesfully",
      });
      navigate(from, { replace: true });
    }

    dispatch(reset());
  }, [dispatch, isSuccess, isError, user, error]);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(loginUser(form.values));
    }
  };

  return (
    <Box mt={40}>
      <Container size="sm">
        <Card withBorder mx="auto" shadow="xl" p={26}>
          <Title order={4} mb={16}>
            Login to your account
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <TextInput
                label="Username or Email"
                placeholder="Your username or email"
                {...form.getInputProps("username")}
                mb={16}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
            </Flex>
            <Button mt={30} fullWidth type="submit" loading={userLoading}>
              Login
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
