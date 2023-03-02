import { Card, Box, Flex, Text, Image, Avatar, Button } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import WriteReviewOrder from "./WriteReviewOrder";
import { writeReview } from "../../features/user/userSlice";

const OrderItem = (props) => {
  const dispatch = useDispatch();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewItem, setReviewItem] = useState("");

  const createReviewHandler = (item) => {
    const reviewData = {
      type: "buy",
      reviewText: item.text,
      reviewNumber: item.reviewNumber,
      reviewedFor: reviewItem.owner._id,
      reviewedBy: props.currentUser.id,
      transaction: reviewItem._id,
      order: props.order._id,
    };
    dispatch(writeReview(reviewData));
  };

  return (
    <Card withBorder shadow="md" mb={20}>
      {props.order.orderItems.map((item) => (
        <Box key={item._id} mb={10}>
          <WriteReviewOrder
            opened={reviewOpen}
            setOpened={setReviewOpen}
            createReviewHandler={createReviewHandler}
          />
          <Flex gap={20} align="center" justify="space-between">
            <Image
              radius="sm"
              height={80}
              width={60}
              src={process.env.REACT_APP_BASE_IMAGE_URL + item.image[0].url}
            />
            <Text weight={500}>{item.title}</Text>
            <Text weight={500}>{`${item.quantity} X Rs. ${item.price}`}</Text>
            <Flex align="center" gap={10}>
              <Avatar radius="xl" src={process.env.REACT_APP_BASE_IMAGE_URL + item.owner.photo} />
              <Text>{item.owner.name}</Text>
            </Flex>
            <Button
              color="secondary"
              onClick={() => {
                setReviewItem(item);
                setReviewOpen(true);
              }}
            >
              Review
            </Button>
          </Flex>
        </Box>
      ))}
      <Flex mt={16} justify="space-between">
        <Box>
          <Text weight={500} size="md">
            Shipping Details
          </Text>
          <Text>Name: {props.order.shippingDetails.name}</Text>
          <Text>Email: {props.order.shippingDetails.email}</Text>
          <Text>Phone number: {props.order.shippingDetails.phoneNumber}</Text>
          <Text>
            Address: {props.order.shippingDetails.address + ", " + props.order.shippingDetails.city}
          </Text>
        </Box>
        <Box sx={{ textAlign: "right", alignSelf: "flex-end" }}>
          <Text color="dimmed">Ordered at: {new Date(props.order.createdAt).toLocaleString()}</Text>
          <Text weight={600} color="primary" size="lg">
            Total: Rs. {props.order.totalPrice}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default OrderItem;
