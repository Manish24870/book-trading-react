import { Link } from "react-router-dom";
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
  ActionIcon,
  Grid,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "@mantine/carousel";
import { RiAuctionLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";

const bookQualityText = {
  1: "Poor",
  2: "Below Average",
  3: "Average",
  4: "Good",
  5: "Perfect",
};

const AuctionBookInfo = (props) => {
  const dispatch = useDispatch();

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
                  <Badge key={el} radius="sm" size="lg" color="secondary" mr={8}>
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
              <Group>
                <Text size="md" weight={500}>
                  {bookQualityText[props.book.bookQuality]}
                </Text>
                <Badge radius="sm" color="secondary">
                  {props.book.bookQuality}
                </Badge>
              </Group>
            </Text>
            <Text mt={22} weight={600}>
              Published Date{" "}
              <Text size="lg" weight={500}>
                {props.book.publishedDate}
              </Text>
            </Text>
            <Text mt={22} weight={600}>
              Description{" "}
              <Text weight={400}>
                {props.book.description.length > 280
                  ? props.book.description.slice(0, 280) + " ..."
                  : props.book.description}
              </Text>
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
      <Grid columns={2} my={30} align="center">
        <Grid.Col span={1}>
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
        <Grid.Col span={1} sx={{ textAlign: "right" }}>
          <Group position="right">
            {props.book.owner._id === props.currentUserId ? (
              <ActionIcon
                variant="light"
                color="primary"
                size="lg"
                mt={16}
                component={Link}
                to={`/auction/${props.book._id}/settings`}
              >
                <VscSettings size={22} />
              </ActionIcon>
            ) : null}

            <Button
              // disabled={props.book.owner._id === props.curentUserId}
              leftIcon={<RiAuctionLine size={22} />}
              size="lg"
              mt={16}
              // onClick={createExchangeHandler}
              // loading={createExchangeLoading || myInitiatesLoading}
              component={Link}
              to={`/auction/${props.book._id}/running`}
            >
              Go to Auction
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default AuctionBookInfo;
