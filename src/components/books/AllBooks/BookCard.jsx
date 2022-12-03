import {
  Box,
  Card,
  Text,
  Image,
  Group,
  Button,
  Divider,
  Badge,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { IoStarOutline } from "react-icons/io5";

const BookCard = (props) => {
  const theme = useMantineTheme();

  return (
    <Card radius="md" withBorder p="lg" mb={18} shadow="lg">
      <Card.Section>
        <Carousel withIndicators loop>
          {props.book.images.map((image) => (
            <Carousel.Slide key={image._id}>
              <Image src={process.env.REACT_APP_BASE_IMAGE_URL + image.url} height={230} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>
      <Group position="apart" mt="lg" mb="md">
        <Box sx={{ alignSelf: "flex-start" }}>
          <Text weight={500} size="lg">
            {props.book.title}
          </Text>
          <Text size="xs" color="dimmed">
            {new Date(props.book.createdAt).toLocaleString()}
          </Text>
          <Group spacing="xs" mt="sm">
            <Avatar
              size="md"
              radius="xl"
              src={
                "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80"
              }
            />
            <Box>
              <Text size="sm">{props.book.owner.name}</Text>
              <Text size="xs" color="dimmed">
                {props.book.owner.username}
              </Text>
            </Box>
          </Group>
        </Box>

        <Group spacing={5} color="primary" sx={{ alignSelf: "flex-start" }}>
          <IoStarOutline size={18} color={theme.colors.primary[6]} />
          <Text size="xs" weight={500} color={theme.colors.primary[6]}>
            4.80
          </Text>
        </Group>
      </Group>
      <Card.Section px="xl" py="sm">
        <Text size="sm" weight={500}>
          Details
        </Text>
        <Divider />
        <Group mt={10} position="apart">
          <Text size="sm">Type</Text>
          <Badge radius="sm" size="sm">
            {props.book.listing}
          </Badge>
        </Group>
        <Group mt={10} position="apart">
          <Text size="sm">Author</Text>
          <Badge radius="sm" size="sm">
            {props.book.author}
          </Badge>
        </Group>
        <Group mt={10} position="apart">
          <Text size="sm">Condition</Text>
          <Badge radius="sm" size="sm">
            {props.book.bookQuality}
          </Badge>
        </Group>
      </Card.Section>
      <Group position="apart" mt="lg">
        <Text size="xl" span weight={500}>
          Rs. {props.book.price}
        </Text>
        <Button component={Link} to={`/book/${props.book._id}`}>
          View
        </Button>
      </Group>
    </Card>
  );
};

export default BookCard;
