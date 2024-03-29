import {
  Box,
  Text,
  Title,
  Image,
  Badge,
  Chips,
  Group,
  Button,
  Avatar,
  Card,
  Grid,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { Carousel } from "@mantine/carousel";
import { BsCartPlus } from "react-icons/bs";

import { addToCart } from "../../../features/cart/cartSlice";

const bookQualityText = {
  1: "Poor",
  2: "Below Average",
  3: "Average",
  4: "Good",
  5: "Perfect",
};

const SellBookInfo = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const cartItem = {
      _id: props.book._id,
      image: props.book.images,
      title: props.book.title,
      price: props.book.price,
      isbn: props.book.isbn,
      category: props.book.category,
      owner: props.book.owner,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <Box>
      <Group position="apart">
        <Title order={4}>Book Details</Title>
        {/* <div>
          <Button mr={20} variant="outline" size="xs">
            Edit
          </Button>
          <Button variant="outline" color="red" size="xs">
            Delete
          </Button>
        </div> */}
      </Group>
      <Grid columns={12} gutter="xl">
        <Grid.Col span={12} md={4}>
          <Box>
            <Carousel withIndicators loop>
              {props.book.images.map((image) => (
                <Carousel.Slide key={image._id}>
                  <Image
                    src={process.env.REACT_APP_BASE_IMAGE_URL + image.url}
                    height={550}
                    fit="cover"
                    radius="sm"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>
        </Grid.Col>
        <Grid.Col span={12} sm={8}>
          <Box>
            <Title order={3} mb={2}>
              {props.book.title}
            </Title>
            <Text color="dimmed">ISBN: {props.book.isbn}</Text>
            <Text color="dimmed">
              Date Added: {new Date(props.book.createdAt).toLocaleString()}
            </Text>

            <Group position="apart">
              <Box mt={16}>
                <Text weight={600} mb={8}>
                  Listed For
                </Text>
                <Badge radius="sm" size="lg" color="secondary" mr={8}>
                  {props.book.listing}
                </Badge>
              </Box>
              <Box mt={16}>
                <Text weight={600} mb={8}>
                  Category
                </Text>
                {props.book.category.map((el) => (
                  <Badge radius="sm" key={el} size="lg" color="secondary" mr={8}>
                    {el}
                  </Badge>
                ))}
              </Box>
              <Box mt={22}>
                <Text weight={600} mb={8}>
                  Author
                </Text>
                {props.book.author.split(",").map((el) => (
                  <Badge key={el} radius="sm" size="lg" color="secondary" mr={26}>
                    {el}
                  </Badge>
                ))}
              </Box>
            </Group>

            <Text mt={22} weight={600}>
              Language{" "}
              <Text color="primary" size="lg" weight={500}>
                {props.book.language}
              </Text>
            </Text>
            <Text mt={22} weight={600}>
              Book Quality{" "}
              <Text size="lg" weight={500}>
                {bookQualityText[props.book.bookQuality]}
              </Text>
              <Badge radius="sm" color="secondary">
                {props.book.bookQuality}
              </Badge>
            </Text>
            <Text mt={22} weight={600}>
              Published Date{" "}
              <Text size="lg" weight={500}>
                {props.book.publishedDate}
              </Text>
            </Text>
            <Text mt={22} weight={600}>
              Description <Text weight={400}>{props.book.description}</Text>
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
      <Grid columns={2} my={30} align="center">
        <Grid.Col span={2} sm={1}>
          <Card withBorder sx={{ width: "100%" }}>
            <Group>
              <Avatar
                src={process.env.REACT_APP_BASE_IMAGE_URL + props.book.owner.photo}
                radius="xl"
                size="xl"
              />
              <Box>
                <Text weight={600}>{props.book.owner.name}</Text>
                <Text>{props.book.owner.email}</Text>
                <Badge radius="sm">{props.book.owner.role}</Badge>
              </Box>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={2} sm={1} sx={{ textAlign: "right" }}>
          <Text size="xl" weight={700}>
            Rs. 1200
          </Text>
          <Button
            disabled={props.book.owner._id === props.curentUserId}
            leftIcon={<BsCartPlus size={20} />}
            size="lg"
            mt={16}
            onClick={addToCartHandler}
          >
            Add to Cart
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default SellBookInfo;
