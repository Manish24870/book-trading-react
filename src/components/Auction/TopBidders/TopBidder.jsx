import { Box, Text, Avatar, Flex, Card } from "@mantine/core";
import Loading from "../../common/Loading";

const TopBidder = (props) => {
  console.log(props);
  return (
    <Box mb={8}>
      <Card withBorder p="xs">
        <Flex align="center">
          <Avatar
            radius="xl"
            size="lg"
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
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
