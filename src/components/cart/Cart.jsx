import { Box, Title, Container, Button, Group } from "@mantine/core";

import BookList from "./BookList";
import CartSummary from "./CartSummary";

const Cart = (props) => {
  return (
    <Box mt={20}>
      <Container size="lg">
        <Group position="apart">
          <Title order={4}>Cart</Title>
          <Button size="xs" variant="light">
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
