import {
  Box,
  Title,
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
import { Carousel } from "@mantine/carousel";
import { IoStarOutline } from "react-icons/io5";

const BookCard = (props) => {
  const theme = useMantineTheme();

  return (
    <Card radius="md" withBorder p="lg" mb={18}>
      <Card.Section>
        <Carousel withIndicators loop>
          <Carousel.Slide>
            <Image
              src={
                "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              }
              height={220}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src={
                "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              }
              height={220}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src={
                "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              }
              height={220}
            />
          </Carousel.Slide>
        </Carousel>
      </Card.Section>
      <Group position="apart" mt="lg" mb="md">
        <Box sx={{ alignSelf: "flex-start" }}>
          <Text weight={500} size="lg">
            No fixed address
          </Text>
          <Text size="xs" color="dimmed">
            Sat, 12 Jan 2022
          </Text>
          <Group spacing="xs" mt="sm">
            <Avatar
              size="sm"
              radius="xl"
              src={
                "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80"
              }
            />
            <Text size="sm">John Smith</Text>
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
            Sell
          </Badge>
        </Group>
        <Group mt={10} position="apart">
          <Text size="sm">Author</Text>
          <Badge radius="sm" size="sm">
            John Smith
          </Badge>
        </Group>
        <Group mt={10} position="apart">
          <Text size="sm">Condition</Text>
          <Badge radius="sm" size="sm">
            1
          </Badge>
        </Group>
      </Card.Section>
      <Group position="apart" mt="lg">
        <Text size="xl" span weight={500}>
          Rs. 500
        </Text>
        <Button>View</Button>
      </Group>
    </Card>
  );
};

export default BookCard;
