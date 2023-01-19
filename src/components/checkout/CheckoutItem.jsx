import {
  Box,
  Group,
  Text,
  Image,
  ActionIcon,
  ColorSwatch,
  Card,
  useMantineTheme,
} from "@mantine/core";
import { BsPlus, BsDash, BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../../features/cart/cartSlice";

const CheckoutItem = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  return (
    <Card withBorder shadow="md" mb={15} p="xs">
      <Group sx={{ alignItems: "flex-start" }}>
        <Box>
          <Image
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.cartItem.image[0].url}
            fit="cover"
            radius="xs"
            alt="Book image"
            width={80}
            height={100}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Text>{props.cartItem.name}</Text>
            <Text weight={600}>Rs. {props.cartItem.price}</Text>
          </Box>

          <Box mt={10} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Group>
              <ActionIcon
                color="primary"
                size="sm"
                onClick={() => dispatch(decreaseCartQuantity(props.cartItem._id))}
                disabled={props.cartItem.quantity === 1 ? true : false}
              >
                <BsDash size={22} />
              </ActionIcon>
              <Text mx={8}>{props.cartItem.quantity}</Text>
              <ActionIcon
                color="primary"
                size="sm"
                onClick={() => dispatch(increaseCartQuantity(props.cartItem._id))}
              >
                <BsPlus size={22} />
              </ActionIcon>
            </Group>
            <Group>
              <ActionIcon color="red" onClick={() => dispatch(removeFromCart(props.cartItem._id))}>
                <BsX size={24} />
              </ActionIcon>
            </Group>
          </Box>
        </Box>
      </Group>
    </Card>
  );
};

export default CheckoutItem;
