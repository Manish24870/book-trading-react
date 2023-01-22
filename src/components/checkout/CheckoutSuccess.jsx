import { useEffect } from "react";
import { Box, Title, Container, Card, Text, useMantineTheme } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

import isEmpty from "../../utils/isEmpty";

const CheckoutSuccess = (props) => {
  const theme = useMantineTheme();

  const { order, isSuccess } = useSelector((state) => state.wallet);

  return (
    <Box mt={20}>
      <Container size="lg">
        {isSuccess && !isEmpty(order) && (
          <Card
            withBorder
            shadow="md"
            sx={{ maxWidth: 600, textAlign: "center", margin: "80px auto" }}
          >
            <IoCheckmarkDoneCircle size={70} color={theme.colors.primary[6]} />

            <Text weight={500} mb={20}>
              Your order has been placed successfully
            </Text>
            <Text mb={10}>Order Id: {order._id}</Text>
            <Text mb={10}>Total Amount: Rs. {order.totalPrice}</Text>
            <Text mb={10}>Date: {new Date(order.createdAt).toString()}</Text>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default CheckoutSuccess;
