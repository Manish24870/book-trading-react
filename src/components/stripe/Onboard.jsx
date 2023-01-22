import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Card, Text } from "@mantine/core";

import { stripeOnboard } from "../../features/stripe/stripeSlice";
import { errorNotification } from "../../utils/notification/showNotification";
import Loading from "../common/Loading";

const Onboard = (props) => {
  const dispatch = useDispatch();

  const { isSuccess, isError, error, stripeOnboardLoading } = useSelector((state) => state.stripe);

  useEffect(() => {
    dispatch(stripeOnboard());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Onboard error", message: error });
    }
  }, [dispatch, isError, isSuccess]);

  let renderOnboard = <Loading />;

  if (stripeOnboardLoading) {
    renderOnboard = <Loading />;
  } else if (!stripeOnboardLoading && isSuccess) {
    renderOnboard = (
      <Text align="center" size="lg" weight={500}>
        Stripe account connection success
      </Text>
    );
  }

  return (
    <Box mt={20}>
      <Container size="lg">
        <Card withBorder shadow="md">
          {renderOnboard}
        </Card>
      </Container>
    </Box>
  );
};

export default Onboard;
