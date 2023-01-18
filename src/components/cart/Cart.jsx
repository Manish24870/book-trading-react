import { Box, Title, Container } from "@mantine/core";

import BookList from "./BookList";
import CartSummary from "./CartSummary";

const Cart = (props) => {
  return (
    <Box mt={20}>
      <Container size="lg">
        <Title order={4}>Cart</Title>
        <BookList />
        <CartSummary />
      </Container>
    </Box>
  );
};

export default Cart;
