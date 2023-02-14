import { Box, Text, Avatar, Flex, Card } from "@mantine/core";

const TopBidder = (props) => {
  console.log(props);
  return (
    <Box mb={8}>
      <Card withBorder p="xs">
        <Flex align="center">
          <Avatar
            radius="xl"
            size="lg"
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.bidder.participant.photo}
          />
          <Box ml={8}>
            <Text weight={500}>{props.bidder.participant.name}</Text>
            <Text color="dimmed">
              {new Date(props.bidder.bids[props.bidder.bids.length - 1].date).toLocaleString()}
            </Text>
          </Box>
          <Text weight={600} sx={{ marginLeft: "auto" }}>
            Rs. {props.bidder.totalBidAmount}
          </Text>
        </Flex>
      </Card>
    </Box>
  );
};

export default TopBidder;
