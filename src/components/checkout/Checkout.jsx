import { useEffect } from "react";
import { Box, Title, Card, Grid, Group, Text, Container } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import ShippingDetails from "./ShippingDetails";
import OrderSummary from "./OrderSummary";
import isEmpty from "../../utils/isEmpty";
import { buyBook } from "../../features/wallet/walletSlice";

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  name: Joi.string().required().messages({
    "string.empty": "Your name is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required",
  }),
  phoneNumber: Joi.string().min(10).max(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Invalid phone number",
    "string.max": "Invalid phone number",
  }),
});

const Checkout = (props) => {
  const dispatch = useDispatch();
  const { userProfile, userProfileLoading } = useSelector((state) => state.profile);
  const { cartItems } = useSelector((state) => state.cart);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      phoneNumber: "",
    },
  });

  // Load user personal information from profile
  useEffect(() => {
    if (!isEmpty(userProfile)) {
      form.setValues({
        ...form.values,
        email: userProfile.email,
        name: userProfile.name,
      });
    }
  }, [userProfile, userProfileLoading]);

  // When user clicks for the payment button
  const bookCheckoutHandler = () => {
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      const checkoutInfo = {
        cartItems,
        shippingDetails: form.values,
      };
      dispatch(buyBook(checkoutInfo));
    }
  };

  return (
    <Box mt={20}>
      <Container size="lg">
        <Grid columns={12} gutter="xl">
          <Grid.Col lg={6} xl={7}>
            <Title order={4} mb={20}>
              Checkout
            </Title>
            <ShippingDetails form={form} />
          </Grid.Col>
          <Grid.Col lg={6} xl={5}>
            <OrderSummary bookCheckoutHandler={bookCheckoutHandler} />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
