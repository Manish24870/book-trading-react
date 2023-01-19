import { Box, Title, Card, ScrollArea, Group, Text, Button } from "@mantine/core";
import { useSelector } from "react-redux";

import CheckoutItem from "./CheckoutItem";

const OrderSummary = (props) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Box mt={20} sx={{ flex: 1 }}>
      <Box>
        <Title order={5} mb={8}>
          Order Summary
        </Title>
        <Card
          withBorder
          shadow="lg"
          mb={20}
          // sx={(style) => ({
          //   backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
          // })}
        >
          <ScrollArea sx={{ height: "400px" }}>
            {cartItems.map((item) => (
              <CheckoutItem
                key={item._id}
                cartItem={item}
                // removeFromCart={props.removeFromCart}
                // increaseCartItemQuantity={props.increaseCartItemQuantity}
                // decreaseCartItemQuantity={props.decreaseCartItemQuantity}
              />
            ))}
          </ScrollArea>
        </Card>
      </Box>
    </Box>
  );
};

export default OrderSummary;
