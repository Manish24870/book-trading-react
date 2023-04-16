import {
  Box,
  Grid,
  Image,
  Text,
  Group,
  Badge,
  Flex,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { BsPlus, BsDash, BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../../features/cart/cartSlice";

const BookListItem = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  return (
    <Grid columns={12} align="center" justify="center">
      <Grid.Col span={5} sx={{ backgroundColor: theme.colors.gray[1], borderRadius: 4 }}>
        <Group spacing="xl">
          <Image
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.cartItem.image[0].url}
            width={70}
            height={90}
            radius="sm"
            py={6}
          />
          <Flex direction="column">
            <Text weight={500}>{props.cartItem.title}</Text>
            <Text color="dimmed" size="sm">
              {props.cartItem.isbn}
            </Text>
            {props.cartItem.category.map((el) => (
              <Badge key={el} radius="sm">
                {el}
              </Badge>
            ))}
          </Flex>
        </Group>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text weight={500} align="center">
          Rs. {props.cartItem.price}
        </Text>
      </Grid.Col>
      <Grid.Col span={2}>
        <Group position="center" spacing="lg" sx={{ textAlign: "center" }}>
          {/* <ActionIcon
            size="md"
            color="primary"
            // onClick={() => dispatch(decreaseCartQuantity(props.cartItem._id))}
            disabled={props.cartItem.quantity === 1}
          >
            <BsDash size={22} />
          </ActionIcon> */}
          <Text weight={500}>{props.cartItem.quantity}</Text>
          {/* <ActionIcon
            size="md"
            color="primary"
            // onClick={() => dispatch(increaseCartQuantity(props.cartItem._id))}
          >
            <BsPlus size={22} />
          </ActionIcon> */}
        </Group>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text weight={500} align="center">
          Rs. {props.cartItem.price * props.cartItem.quantity}
        </Text>
      </Grid.Col>
      <Grid.Col span={1}>
        <ActionIcon
          size="md"
          color="red"
          sx={{ marginLeft: "auto" }}
          onClick={() => dispatch(removeFromCart(props.cartItem._id))}
        >
          <BsX size={24} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};

export default BookListItem;
