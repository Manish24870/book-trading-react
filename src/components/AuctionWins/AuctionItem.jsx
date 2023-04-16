import {
  Box,
  Card,
  Grid,
  Text,
  Image,
  Avatar,
  Flex,
  Group,
  Divider,
  Badge,
  Button,
  useMantineTheme,
  Chip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const AuctionItem = (props) => {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery("(max-width: 48em)");
  const mediumScreen = useMediaQuery("(max-width: 64em)");
  const largeScreen = useMediaQuery("(max-width: 74em)");

  return (
    <Card withBorder shadow="lg" p="sm" mb={26}>
      <Flex direction={smallScreen ? "column" : "row"} justify={"space-between"}>
        <Card withBorder>
          <Flex gap={30}>
            <Image
              src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.book.images[0].url}
              height={206}
              width={130}
            />
            <Box>
              <Box>
                <Text weight={500} size="md">
                  {props.auction.book.title}
                </Text>
                <Text size="xs" color="dimmed">
                  {new Date(props.auction.book.createdAt).toLocaleString()}
                </Text>
              </Box>
              <Group mt={16} position="apart">
                <Text size="sm">Type</Text>
                <Badge radius="sm" size="sm">
                  {props.auction.book.listing}
                </Badge>
              </Group>
              <Group mt={10} position="apart">
                <Text size="sm">Author</Text>
                <Badge radius="sm" size="sm">
                  {props.auction.book.author}
                </Badge>
              </Group>
              <Group mt={10} position="apart">
                <Text size="sm">Condition</Text>
                <Badge radius="sm" size="sm">
                  {props.auction.book.bookQuality}
                </Badge>
              </Group>
              <Button
                mt={16}
                fullWidth
                size="xs"
                component={Link}
                sx={{ marginLeft: "auto" }}
                to={`/auction/${props.auction.book._id}`}
              >
                View
              </Button>
            </Box>
          </Flex>
        </Card>
        <Flex direction="column" justify="space-between">
          <Card withBorder py={4} px={10}>
            <Flex gap={20} align="center">
              <Avatar
                size="md"
                radius="xl"
                src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.owner.photo}
              />
              <Box>
                <Text size="sm">{props.auction.owner.name}</Text>
                <Text size="sm" color="dimmed">
                  {props.auction.owner.username}
                </Text>
              </Box>
              <Text color="dimmed" size="sm">
                {new Date(props.auction.book.createdAt).toLocaleString()}
              </Text>
            </Flex>
          </Card>
          <Card withBorder py={4} px={10}>
            <Text mb={6} weight={500}>
              Auction details
            </Text>
            <Flex justify="space-between" mb={6}>
              <Text size="sm">Total participants </Text>
              <Chip radius="sm" variant="filled">
                {props.auction.participants.length}
              </Chip>
            </Flex>
            <Flex justify="space-between" mb={6}>
              <Text size="sm">Started at </Text>
              <Chip radius="sm" variant="filled">
                {new Date(props.auction.schedule.date).toLocaleString()}
              </Chip>
            </Flex>
            <Flex justify="space-between" mb={6}>
              <Text size="sm">Ended at</Text>
              <Chip radius="sm" variant="filled">
                {new Date(props.auction.schedule.endDate).toLocaleString()}
              </Chip>
            </Flex>
            <Flex justify="space-between" mb={6}>
              <Text size="sm">Your bid</Text>
              <Badge radius="sm" size="lg">
                {"Rs. " + props.auction.winner.bid}
              </Badge>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AuctionItem;
