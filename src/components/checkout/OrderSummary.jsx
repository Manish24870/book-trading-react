import { Box, Title, Card, ScrollArea, Group, Text, Button } from "@mantine/core";
import { useSelector } from "react-redux";

import CheckoutItem from "./CheckoutItem";

const OrderSummary = (props) => {
  const { cartItems } = useSelector((state) => state.cart);

  let totalCost = 0;
  let serviceCharge = 20;
  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });

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
          <Group grow position="apart" mb={8}>
            <Text weight={600} size="lg">
              Subtotal :
            </Text>
            <Text weight={600} color="primary" size="lg" sx={{ textAlign: "right" }}>
              Rs {totalCost}
            </Text>
          </Group>
          <Group grow mb={16}>
            <Text weight={600} size="lg">
              Service Charge :
            </Text>
            <Text weight={600} color="primary" size="lg" sx={{ textAlign: "right" }}>
              Rs {serviceCharge}
            </Text>
          </Group>
          <Group grow mb={8}>
            <Text weight={800} size="xl">
              TOTAL :
            </Text>
            <Text weight={800} color="primary" size="xl" sx={{ textAlign: "right" }}>
              Rs {totalCost + serviceCharge}
            </Text>
          </Group>
        </Card>
        <Button fullWidth size="lg" mt={16}>
          Payment
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
