import { useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Group,
  Flex,
  Avatar,
  Badge,
  Card,
  Button,
  Grid,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { AiOutlineStar, AiOutlineCheck } from "react-icons/ai";
import { IoCloseOutline, IoCheckmarkOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { acceptOffer, rejectOffer, getMyOffers } from "../../features/exchange/exchangeSlice";
import { successNotification } from "../../utils/notification/showNotification";

const OfferItem = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const { isAcceptOfferSuccess, isRejectOfferSuccess } = useSelector((state) => state.exchange);

  useEffect(() => {
    if (isAcceptOfferSuccess) {
      dispatch(getMyOffers());
      successNotification({
        title: "Offer accepted",
        message: "Exchange offer accepted successfully",
      });
    }
  }, [isAcceptOfferSuccess]);

  useEffect(() => {
    if (isRejectOfferSuccess) {
      dispatch(getMyOffers());
      successNotification({
        title: "Offer rejected",
        message: "Exchange offer rejected successfully",
      });
    }
  }, [isRejectOfferSuccess]);

  // When user accepts an offer
  const offerAcceptHandler = () => {
    const offerData = {
      exchangeId: props.exchangeId,
      initiatorItemId: props.initiatorItemId,
    };
    dispatch(acceptOffer(offerData));
  };

  // When user rejects an offer
  const offerRejectHandler = () => {
    const offerData = {
      exchangeId: props.exchangeId,
      initiatorItemId: props.initiatorItemId,
    };
    dispatch(rejectOffer(offerData));
  };

  // Check the status of the offer
  const checkOfferStatus = () => {
    if (props.offerStatus === "accepted") {
      return <Button variant="outline">Accepted</Button>;
    } else {
      return (
        <Flex direction="column" sx={{ marginTop: "auto" }}>
          <Button leftIcon={<IoCheckmarkOutline size={20} />} mb={12} onClick={offerAcceptHandler}>
            Accept
          </Button>
          <Button color="red" leftIcon={<IoCloseOutline size={20} />} onClick={offerRejectHandler}>
            Reject
          </Button>
        </Flex>
      );
    }
  };

  return (
    <Box mb={16}>
      <Card withBorder shadow="md">
        <Grid columns={12}>
          <Grid.Col span={4}>
            <Text weight={500} size="md" mb={12}>
              Given
            </Text>
            {props.booksGiven.map((book) => (
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
                  src={process.env.REACT_APP_BASE_IMAGE_URL + props.initiatorUser.photo}
                />
                <Box>
                  <Text size="sm">{props.initiatorUser.name}</Text>
                  <Text size="sm" color="dimmed">
                    {props.initiatorUser.email}
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
            span={4}
            sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <Flex direction="column" align="center" mb={12}>
              <Text color="dimmed">Initiated At:</Text>
              <Text>{new Date(props.initiatedAt).toLocaleString()}</Text>
            </Flex>

            {props.acceptedAt ? (
              <Flex direction="column" align="center">
                <Text color="dimmed">Accepted At:</Text>
                <Text>{new Date(props.acceptedAt).toLocaleString()}</Text>
              </Flex>
            ) : null}
            {checkOfferStatus()}
          </Grid.Col>
          <Grid.Col span={4}>
            <Text weight={500} size="md">
              Wanted
            </Text>
            <Card withBorder mb={12} p="xs">
              <Flex>
                <Image
                  src={process.env.REACT_APP_BASE_IMAGE_URL + props.bookWanted.images[0].url}
                  height={120}
                  width={80}
                  radius="sm"
                />
                <Flex direction="column" ml={8}>
                  <Text weight={500} size="sm" mb={3}>
                    {props.bookWanted.title}
                  </Text>
                  <Text color="dimmed" size="sm" mb={3}>
                    ISBN: {props.bookWanted.isbn}
                  </Text>
                  <Text color="dimmed" size="sm" mb={3}>
                    Author:{" "}
                    <Badge radius="sm" size="sm">
                      {props.bookWanted.author}
                    </Badge>
                  </Text>
                  <Text color="dimmed" size="sm" mb={3}>
                    Quality:{" "}
                    <Badge radius="sm" size="sm">
                      {props.bookWanted.bookQuality}
                    </Badge>
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>
    </Box>
  );
};

export default OfferItem;
