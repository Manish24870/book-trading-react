import { useEffect } from "react";
import { Box, Title, Card, ScrollArea, Group, Text, Button } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";

import CheckoutItem from "./CheckoutItem";
import { stripePayment } from "../../features/stripe/stripeSlice";
import { clearCart } from "../../features/cart/cartSlice";
import isEmpty from "../../utils/isEmpty";
import { errorNotification, successNotification } from "../../utils/notification/showNotification";

const OrderSummary = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { buyBookLoading, isSuccess, isError, error } = useSelector((state) => state.wallet);

  let totalCost = 0;
  let serviceCharge = 20;
  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });

  useEffect(() => {
    if (isError && !isEmpty(error)) {
      errorNotification({ title: "Checkout error", message: error });
    }

    if (isSuccess) {
      successNotification({
        title: "Payment complete",
        message: "Your book order completed successfully",
      });
      dispatch(clearCart());
      navigate("/checkout/success", { replace: true });
    }
  }, [dispatch, isSuccess, isError]);

  return (
    <Box sx={{ flex: 1 }}>
      <Box>
        <Title order={5} mb={8}>
          Order Summary
        </Title>
        <Card withBorder shadow="lg" mb={12}>
          <ScrollArea sx={{ height: "350px" }}>
            {cartItems.map((item) => (
              <CheckoutItem key={item._id} cartItem={item} />
            ))}
          </ScrollArea>
        </Card>
        <Card withBorder shadow="lg">
          <Group position="apart" mb={8}>
            <Text weight={600} size="lg">
              Subtotal :
            </Text>
            <Text weight={600} color="primary" size="lg" sx={{ textAlign: "right" }}>
              Rs {totalCost}
            </Text>
          </Group>
          <Group mb={16}>
            <Text weight={600} size="lg">
              Service Charge :
            </Text>
            <Text weight={600} color="primary" size="lg" sx={{ textAlign: "right" }}>
              Rs {serviceCharge}
            </Text>
          </Group>
          <Group mb={8}>
            <Text weight={800} size="xl">
              TOTAL :
            </Text>
            <Text weight={800} color="primary" size="xl" sx={{ textAlign: "right" }}>
              Rs {totalCost + serviceCharge}
            </Text>
          </Group>
        </Card>
        <Button
          fullWidth
          loading={buyBookLoading}
          size="lg"
          mt={16}
          leftIcon={<MdPayment size={20} />}
          onClick={props.bookCheckoutHandler}
          disabled={cartItems.length === 0}
        >
          Payment
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
