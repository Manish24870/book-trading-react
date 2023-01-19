import { useState } from "react";
import { Stepper, Box, Title, Card, Grid, Group, Text, Container } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";

import ShippingDetails from "./ShippingDetails";
import OrderSummary from "./OrderSummary";

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
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <Box mt={20}>
      <Container size="lg">
        <Title order={4} mb={20}>
          Checkout
        </Title>
        <Grid columns={12}>
          <Grid.Col lg={6} xl={7}>
            <ShippingDetails form={form} />
          </Grid.Col>
          <Grid.Col lg={6} xl={5}>
            <OrderSummary />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
