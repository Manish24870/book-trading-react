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

const BookListItem = (props) => {
  const theme = useMantineTheme();

  return (
    <Grid columns={12} align="center" justify="center">
      <Grid.Col span={5} sx={{ backgroundColor: theme.colors.gray[1], borderRadius: 4 }}>
        <Group spacing="xl">
          <Image
            src={
              "https://images.unsplash.com/photo-1673981171900-020cb6983841?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1221&q=80"
            }
            width={70}
            height={90}
            radius="sm"
            py={6}
          />
          <Flex direction="column">
            <Text weight={500}>To Kill a Mockingbird</Text>
            <Text color="dimmed" size="sm">
              1205968059479
            </Text>
            <Badge radius="sm" mt={8}>
              Fiction
            </Badge>
            <Group></Group>
          </Flex>
        </Group>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text weight={500} align="center">
          Rs. 1200
        </Text>
      </Grid.Col>
      <Grid.Col span={2}>
        <Group position="center" spacing="lg" sx={{ textAlign: "center" }}>
          <ActionIcon size="md" color="primary">
            <BsDash size={22} />
          </ActionIcon>
          <Text weight={500}>2</Text>
          <ActionIcon size="md" color="primary">
            <BsPlus size={22} />
          </ActionIcon>
        </Group>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text weight={500} align="center">
          Rs. 2450
        </Text>
      </Grid.Col>
      <Grid.Col span={1}>
        <ActionIcon size="md" color="red" sx={{ marginLeft: "auto" }}>
          <BsX size={24} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};

export default BookListItem;
