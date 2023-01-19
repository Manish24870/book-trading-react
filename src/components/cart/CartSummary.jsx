import { Card, Group, Text, Button, useMantineTheme } from "@mantine/core";
import { IoBagCheckOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const CartSummary = (props) => {
  const theme = useMantineTheme();
  const { cartItems } = useSelector((state) => state.cart);
  let totalCost = 0;
  let serviceCharge = 20;
  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });

  return (
    <Card sx={{ backgroundColor: theme.colors.gray[1] }} my={30}>
      <Group position="apart" mb={8}>
        <Text weight={600}>SUBTOTAL</Text>
        <Text weight={500} size="lg">
          Rs. {totalCost}
        </Text>
      </Group>
      <Group position="apart" mb={8}>
        <Text weight={600}>SERVICE CHARGE</Text>
        <Text weight={500} size="lg">
          Rs. {serviceCharge}
        </Text>
      </Group>
      <Group position="apart" mb={8}>
        <Text weight={600}>TOTAL</Text>
        <Text weight={500} size="lg">
          Rs. {totalCost + serviceCharge}
        </Text>
      </Group>
      <Group position="right" mt={20}>
        <Button size="lg" sx={{ marginLeft: "auto" }} leftIcon={<IoBagCheckOutline size={22} />}>
          Checkout
        </Button>
      </Group>
    </Card>
  );
};

export default CartSummary;
