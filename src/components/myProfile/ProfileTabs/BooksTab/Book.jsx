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
  Overlay,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { IoStarOutline } from "react-icons/io5";

const Book = (props) => {
  const theme = useMantineTheme();

  return (
    <Card radius="md" withBorder p="sm" mb={16} shadow="lg">
      {!props.book.available ? (
        <>
          <Card
            shadow="md"
            px={60}
            sx={{
              position: "absolute",
              backgroundColor: theme.colors.gray[4],

              top: "40%",
              right: "28%",
              zIndex: 1000,
            }}
          >
            <Text
              color="primary"
              gradient="linear-gradient( rgba(34, 139, 230, 0.95) 0%, rgba(162, 68, 0, 71) 100%)"
            >
              {" "}
              {props.book.listing === "Sell"
                ? "Sold"
                : props.book.listing === "Auction"
                ? "Auctioned"
                : "Exchanged"}
            </Text>
          </Card>
          <Overlay
            gradient="linear-gradient(145deg, rgba(34, 139, 230, 0.95) 0%, rgba(162, 68, 0, 71) 100%)"
            opacity={0.45}
          />
        </>
      ) : null}

      <Card.Section>
        <Carousel withIndicators loop>
          {props.book.images.map((image) => (
            <Carousel.Slide key={image._id}>
              <Image src={process.env.REACT_APP_BASE_IMAGE_URL + image.url} height={300} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>
      <Box sx={{ alignSelf: "flex-start" }} mt={10}>
        <Text weight={500} size="sm">
          {props.book.title}
        </Text>
        <Text size="xs" color="dimmed">
          {new Date(props.book.createdAt).toLocaleString()}
        </Text>
      </Box>

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

export default Book;
