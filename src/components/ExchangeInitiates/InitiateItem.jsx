import {
  Box,
  Text,
  Container,
  Flex,
  Card,
  Image,
  Avatar,
  Button,
  Badge,
  Grid,
  useMantineTheme,
} from "@mantine/core";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";

import WriteReview from "../WriteReview/WriteReview";

const InitiateItem = (props) => {
  const theme = useMantineTheme();
  const [reviewOpen, setReviewOpen] = useState(false);
  const initiatorData = props.initiate.initiator.filter(
    (el) => el.initiatorUser._id === props.myProfile._id
  )[0];

  // Check the status of the offer
  const checkOfferStatus = () => {
    if (initiatorData.offerStatus === "pending") {
      return <Button>Pending</Button>;
    } else if (initiatorData.offerStatus === "rejected") {
      return <Button color="red">Rejected</Button>;
    } else {
      return <Button>Accepted</Button>;
    }
  };

  if (initiatorData) {
    return (
      <Card withBorder shadow="md" mb={16}>
        <Grid columns={12}>
          <Grid.Col span={12} md={4}>
            <Text weight={500} size="md" mb={12}>
              Given
            </Text>
            {initiatorData.initiatorBooks.map((book) => (
              <Card key={book._id} withBorder mb={12} p="xs">
                <Flex>
                  <Image
                    src={process.env.REACT_APP_BASE_IMAGE_URL + book.images[0].url}
                    height={120}
                    width={80}
                    radius="sm"
                  />
                  <Flex direction="column" ml={8}>
                    <Text weight={500} size="sm" mb={3}>
                      {book.title}
                    </Text>
                    <Text color="dimmed" size="sm" mb={3}>
                      ISBN: {book.isbn}
                    </Text>
                    <Text color="dimmed" size="sm" mb={3}>
                      Author:{" "}
                      <Badge radius="sm" size="sm">
                        {book.author}
                      </Badge>
                    </Text>
                    <Text color="dimmed" size="sm" mb={3}>
                      Quality:{" "}
                      <Badge radius="sm" size="sm">
                        {book.bookQuality}
                      </Badge>
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            ))}
            <Card withBorder shadow="md" sx={{ backgroundColor: theme.colors.gray[1] }}>
              <Flex gap={12} align="center">
                <Avatar
                  radius="xl"
                  src={process.env.REACT_APP_BASE_IMAGE_URL + initiatorData.initiatorUser.photo}
                />
                <Box>
                  <Text size="sm">{initiatorData.initiatorUser.name}</Text>
                  <Text size="sm" color="dimmed">
                    {initiatorData.initiatorUser.email}
                  </Text>
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                  <Flex gap={8}>
                    <AiOutlineStar size={22} color={theme.colors.primary[6]} />
                    <Text color={theme.colors.primary[6]} size="sm">
                      4.5
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col
            span={12}
            md={4}
            sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <Flex direction="column" align="center" mb={12}>
              <Text color="dimmed">Initiated At:</Text>
              <Text>{new Date(initiatorData.initiatedAt).toLocaleString()}</Text>
            </Flex>

            {initiatorData.acceptedAt ? (
              <Flex direction="column" align="center">
                <Text color="dimmed">Accepted At:</Text>
                <Text>{new Date(initiatorData.acceptedAt).toLocaleString()}</Text>
              </Flex>
            ) : null}
            {checkOfferStatus()}
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Text weight={500} size="md" mb={12}>
              Wanted
            </Text>
            <Card withBorder mb={12} p="xs">
              <Flex>
                <Image
                  src={
                    process.env.REACT_APP_BASE_IMAGE_URL + props.initiate.bookWanted.images[0].url
                  }
                  height={120}
                  width={80}
                  radius="sm"
                />
                <Flex direction="column" ml={8}>
                  <Text weight={500} size="sm" mb={3}>
                    {props.initiate.bookWanted.title}
                  </Text>
                  <Text color="dimmed" size="sm" mb={3}>
                    ISBN: {props.initiate.bookWanted.isbn}
                  </Text>
                  <Text color="dimmed" size="sm" mb={3}>
                    Author:{" "}
                    <Badge radius="sm" size="sm">
                      {props.initiate.bookWanted.author}
                    </Badge>
                  </Text>
                  <Text color="dimmed" size="sm" mb={3}>
                    Quality:{" "}
                    <Badge radius="sm" size="sm">
                      {props.initiate.bookWanted.bookQuality}
                    </Badge>
                  </Text>
                </Flex>
              </Flex>
            </Card>
            <Card withBorder shadow="md" sx={{ backgroundColor: theme.colors.gray[1] }}>
              <Flex gap={12} align="center">
                <Avatar
                  radius="xl"
                  src={process.env.REACT_APP_BASE_IMAGE_URL + props.initiate.bookWanted.owner.photo}
                />
                <Box>
                  <Text size="sm">{props.initiate.bookWanted.owner.name}</Text>
                  <Text size="sm" color="dimmed">
                    {props.initiate.bookWanted.owner.email}
                  </Text>
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                  <Flex gap={8}>
                    <AiOutlineStar size={22} color={theme.colors.primary[6]} />
                    <Text color={theme.colors.primary[6]} size="sm">
                      4.5
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
        {initiatorData.acceptedAt ? (
          <>
            <Button color="secondary" mt={10} onClick={() => setReviewOpen(true)}>
              Review
            </Button>
            <WriteReview
              type="exchange"
              ownerId={props.initiate.bookWanted.owner._id}
              exchangeId={props.initiate._id}
              opened={reviewOpen}
              setOpened={setReviewOpen}
              reviewedBy={initiatorData.initiatorUser._id}
            />
          </>
        ) : null}
      </Card>
    );
  } else {
    return null;
  }
};

export default InitiateItem;
