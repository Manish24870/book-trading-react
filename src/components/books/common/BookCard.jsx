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
    <Card radius="md" withBorder p="sm" mb={16} shadow="lg">
      <Card.Section>
        <Carousel withIndicators loop>
          {props.book.images.map((image) => (
            <Carousel.Slide key={image._id}>
              <Image src={process.env.REACT_APP_BASE_IMAGE_URL + image.url} height={300} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>
      <Group position="apart" mt="lg" mb="md">
        <Box sx={{ alignSelf: "flex-start" }}>
          <Text weight={500} size="md">
            {props.book.title}
          </Text>
          <Text size="xs" color="dimmed">
            {new Date(props.book.createdAt).toLocaleString()}
          </Text>
        </Box>

        {/* <Group spacing={5} color="primary" sx={{ alignSelf: "flex-start" }}>
          <IoStarOutline size={18} color={theme.colors.primary[6]} />
          <Text size="xs" weight={500} color={theme.colors.primary[6]}>
            4.80
          </Text>
        </Group> */}
      </Group>
      <Group spacing="xs" mt="sm">
        <Avatar
          size="md"
          radius="xl"
          src={process.env.REACT_APP_BASE_IMAGE_URL + props.book.owner.photo}
        />
        <Box>
          <Text size="sm">{props.book.owner.name}</Text>
          <Text size="xs" color="dimmed">
            {props.book.owner.username}
          </Text>
        </Box>
      </Group>
      <Card.Section px="sm" py="sm">
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
        {props.book.listing === "Sell" ? (
          <Text size="xl" span weight={500}>
            Rs. {props.book.price}
          </Text>
        ) : null}

        <Button
          size="xs"
          component={Link}
          sx={{ marginLeft: "auto" }}
          to={
            props.book.listing === "Sell"
              ? `/sell/${props.book._id}`
              : props.book.listing === "Exchange"
              ? `/exchange/${props.book._id}`
              : `/auction/${props.book._id}`
          }
        >
          View
        </Button>
      </Group>
    </Card>
  );
};

export default BookCard;
