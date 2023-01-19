import { Box, Title, Container, Button, Group } from "@mantine/core";
import { useDispatch } from "react-redux";

import BookList from "./BookList";
import CartSummary from "./CartSummary";
import { clearCart } from "../../features/cart/cartSlice";

const Cart = (props) => {
  const dispatch = useDispatch();

  return (
    <Box mt={20}>
      <Container size="lg">
        <Group position="apart">
          <Title order={4}>Cart</Title>
          <Button size="xs" variant="light" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </Group>

        <BookList />
        <CartSummary />
      </Container>
    </Box>
  );
};

export default Cart;
