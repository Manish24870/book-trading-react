import {
  Text,
  Image,
  Box,
  Group,
  Card,
  Flex,
  SimpleGrid,
  Container,
  Avatar,
  Divider,
  Button,
  Badge,
  Indicator,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const RecommendedBooks = (props) => {
  const theme = useMantineTheme();
  return (
    <Card withBorder my={20}>
      <Text weight={600} mb={10} size="lg">
        Recommended books
      </Text>
      <SimpleGrid cols={3} spacing={50}>
        {props.recommendedBooks.slice(0, 3).map((book) => (
          <Card withBorder shadow="lg" key={book._id}>
            <Indicator color="secondary" size={26} label={Number(book.cosineSimilarity).toFixed(1)}>
              <Carousel withIndicators loop>
                {book.images.map((image) => (
                  <Carousel.Slide key={image._id}>
                    <Image src={process.env.REACT_APP_BASE_IMAGE_URL + image.url} height={300} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Indicator>
            <Group position="apart" mt="lg" mb="md">
              <Box sx={{ alignSelf: "flex-start" }}>
                <Text weight={500} size="md">
                  {book.title}
                </Text>
                <Text size="xs" color="dimmed">
                  {new Date(book.createdAt).toLocaleString()}
                </Text>
              </Box>

              <Group spacing={5} color="primary" sx={{ alignSelf: "flex-start" }}>
                <IoStarOutline size={18} color={theme.colors.primary[6]} />
                <Text size="xs" weight={500} color={theme.colors.primary[6]}>
                  4.80
                </Text>
              </Group>
            </Group>
            <Card withBorder p="xs">
              <Group spacing="xs">
                <Avatar
                  size="md"
                  radius="xl"
                  src={process.env.REACT_APP_BASE_IMAGE_URL + book.owner.photo}
                />
                <Box>
                  <Text size="sm">{book.owner.name}</Text>
                  <Text size="xs" color="dimmed">
                    {book.owner.email}
                  </Text>
                </Box>
              </Group>
            </Card>
            <Card.Section px="sm" py="sm">
              <Text size="sm" weight={500}>
                Details
              </Text>
              <Divider />
              <Group mt={10} position="apart">
                <Text size="sm">Type</Text>
                <Badge radius="sm" size="sm">
                  {book.listing}
                </Badge>
              </Group>
              <Group mt={10} position="apart">
                <Text size="sm">Author</Text>
                <Badge radius="sm" size="sm">
                  {book.author}
                </Badge>
              </Group>
              <Group mt={10} position="apart">
                <Text size="sm">Condition</Text>
                <Badge radius="sm" size="sm">
                  {book.bookQuality}
                </Badge>
              </Group>
            </Card.Section>
            <Group position="apart" mt="sm">
              {book.listing === "Sell" ? (
                <Text size="xl" span weight={500}>
                  Rs. {book.price}
                </Text>
              ) : null}

              <Button
                size="xs"
                component={Link}
                sx={{ marginLeft: "auto" }}
                to={
                  book.listing === "Sell"
                    ? `/sell/${book._id}`
                    : book.listing === "Exchange"
                    ? `/exchange/${book._id}`
                    : `/auction/${book._id}`
                }
              >
                View
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Card>
  );
};

export default RecommendedBooks;
