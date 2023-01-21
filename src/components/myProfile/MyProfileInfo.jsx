import { useEffect } from "react";
import {
  Title,
  Text,
  Avatar,
  Button,
  Box,
  Group,
  Badge,
  Card,
  ActionIcon,
  Container,
  Grid,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { setupStripeAccount } from "../../features/stripe/stripeSlice";
import { errorNotification } from "../../utils/notification/showNotification";
import isEmpty from "../../utils/isEmpty";

const MyProfileInfo = (props) => {
  const dispatch = useDispatch();

  const { error, isError, isSuccess, setupStripeAccountLoading, stripeLink } = useSelector(
    (state) => state.stripe
  );

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Stripe error", message: error });
    }

    if (isSuccess && !isEmpty(stripeLink)) {
      window.open(stripeLink, "_blank");
    }
  }, [dispatch, isError, isSuccess, stripeLink]);

  return (
    <Card withBorder shadow="md">
      <Group sx={{ alignItems: "center" }} spacing="xs">
        <Avatar
          src={
            "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80"
          }
          radius="lg"
          size={160}
        />
        <Group direction="column" spacing={0} sx={{ maxWidth: 400 }}>
          <Title order={3}>{"props.myProfile.name"}</Title>
          <Text size="sm" color="secondary">
            @{"props.myProfile.username"}
          </Text>
          <Text size="sm" color="secondary">
            {"props.myProfile.email"}
          </Text>
          <Button
            loading={setupStripeAccountLoading}
            onClick={() => dispatch(setupStripeAccount())}
          >
            Stripe
          </Button>
        </Group>
      </Group>
    </Card>
  );
};

export default MyProfileInfo;
