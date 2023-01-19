import { Box, Grid, Text, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import BookListItem from "./BookListItem";

const BookList = (props) => {
  const theme = useMantineTheme();
  const { cartItems } = useSelector((store) => store.cart);

  return (
    <Box mt={16} ml={8}>
      <Grid columns={12} align="center" justify="center">
        <Grid.Col span={5} sx={{ backgroundColor: theme.colors.gray[1], borderRadius: 4 }}>
          <Text align="center" weight={600}>
            BOOK
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text align="center" weight={600}>
            PRICE
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text align="center" weight={600}>
            QUANTITY
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text align="center" weight={600}>
            TOTAL
          </Text>
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
      </Grid>
      <Box>
        {cartItems.map((item) => (
          <BookListItem key={item._id} cartItem={item} />
        ))}
      </Box>
    </Box>
  );
};

export default BookList;
