import { Box, Card, Text, Flex, Group, Image, Badge, Avatar, Button } from "@mantine/core";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import Timer from "../common/Timer";
import { subscribeToAuction } from "../../features/auction/auctionSlice";

const AuctionNotStarted = (props) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.user.id);
  const { subscribeToAuctionLoading } = useSelector((state) => state.auction);

  const subscribeHandler = () => {
    dispatch(subscribeToAuction(props.auction._id));
  };

  const isSubscribed = () => {
    let findIndex = props.auction.emailSubscribers.findIndex((el) => el._id === currentUserId);
    if (findIndex > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Card withBorder shadow="lg">
      {props.auction.schedule.isScheduled ? (
        <Box>
          <Card withBorder shadow="md" mb={12}>
            <Group spacing="xl">
              <Image
                src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.book.images[0].url}
                width={90}
                height={120}
                radius="sm"
                py={6}
              />
              <Flex direction="column">
                <Text weight={500}>{props.auction.book.title}</Text>
                <Text color="dimmed" size="sm">
                  {props.auction.book.isbn}
                </Text>
                {props.auction.book.category.map((el) => (
                  <Badge key={el} radius="sm">
                    {el}
                  </Badge>
                ))}
                <Flex mt={16}>
                  <Avatar
                    radius="xl"
                    src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.owner.photo}
                  />
                  <Box ml={12}>
                    <Text weight={600} size="xs">
                      {props.auction.owner.name}
                    </Text>
                    <Text size="xs">{props.auction.owner.email}</Text>
                  </Box>
                </Flex>
              </Flex>
            </Group>
          </Card>
          <Card withBorder shadow="md">
            <Flex align="center" justify="center" mb={12}>
              <Text>This auction is scheduled for </Text>&nbsp;
              <Text color="primary" weight={500} size="lg">
                {new Date(props.auction.schedule.date).toLocaleString()}
              </Text>
            </Flex>
            <Flex align="center" justify="center">
              <Text>This auction will be completed in </Text>&nbsp;
              <Text color="primary" weight={500} size="lg">
                {new Date(props.auction.schedule.endDate).toLocaleString()}
              </Text>
            </Flex>
            <Timer deadline={props.auction.schedule.date} label="The auction will start in" />
            <Flex justify="center">
              {!isSubscribed() ? (
                <Button
                  leftIcon={<IoMdNotificationsOutline size={18} />}
                  onClick={subscribeHandler}
                  loading={subscribeToAuctionLoading}
                >
                  Subscribe
                </Button>
              ) : (
                <Button color="green" leftIcon={<MdOutlineNotificationsActive size={18} />}>
                  Subscribed
                </Button>
              )}
            </Flex>
          </Card>
        </Box>
      ) : (
        <Box>
          <Text>This auction is not scheduled</Text>
        </Box>
      )}
    </Card>
  );
};

export default AuctionNotStarted;
