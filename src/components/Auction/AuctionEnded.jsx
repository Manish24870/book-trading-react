import { Box, Card, Container, Text, Flex, Group, Image, Badge, Avatar } from "@mantine/core";

const AuctionEnded = (props) => {
  // Calculate total current bid of current user
  let totalMoney = 0;
  let bidAmounts = {};
  props.auction.participants.forEach((el) => {
    if (!Object.keys(bidAmounts).includes(el.participant._id)) {
      bidAmounts[el.participant._id] = 0;
    }
    el.bids.forEach((bid) => {
      bidAmounts[el.participant._id] += bid.amount;
      totalMoney += bid.amount;
    });
  });

  const winner = props.auction.participants.filter(
    (el) => el.participant._id === props.auction.winner?.participant
  );

  return (
    <Container size="sm">
      <Card withBorder shadow="lg">
        <Box>
          <Card withBorder shadow="md" mb={12}>
            <Group spacing="xl" position="center">
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
          <Card withBorder sx={{ backgroundColor: "#ECF0FE" }}>
            <Flex align="center" justify="center">
              <Text>This auction ended in </Text>&nbsp;
              <Text color="primary" weight={500} size="lg">
                {new Date(props.auction.schedule.endDate).toLocaleString()}
              </Text>
            </Flex>
          </Card>
          <Card withBorder mb={12} mt={20}>
            <Text weight={600} mb={12} color="primary" align="center">
              Auction Statistics
            </Text>
            <Flex justify="space-between">
              <Box sx={{ textAlign: "center" }}>
                <Text>Total Bidders</Text>
                <Text weight={600} size="xl" color="secondary">
                  {props.auction.participants.length}
                </Text>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Text>Highest Bid</Text>
                <Text weight={600} size="xl" color="secondary">
                  Rs. {Math.max(...Object.values(bidAmounts))}
                </Text>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Text>Total Money</Text>
                <Text weight={600} size="xl" color="secondary">
                  Rs. {totalMoney}
                </Text>
              </Box>
            </Flex>
          </Card>

          {winner[0] && (
            <Card withBorder mb={12} mt={20} sx={{ textAlign: "center" }}>
              <Text weight={600} mb={12} color="primary">
                Auction Winner
              </Text>
              <Flex mt={16} justify="center" align="center">
                <Avatar
                  radius="xl"
                  size="lg"
                  src={process.env.REACT_APP_BASE_IMAGE_URL + winner[0].participant.photo}
                />
                <Box ml={12}>
                  <Text weight={600} size="sm">
                    {winner[0].participant.name}
                  </Text>
                  <Text size="sm">{winner[0].participant.email}</Text>
                </Box>
              </Flex>
              <Box mt={20}>
                <Text weight={600} size="xl" color="secondary">
                  Rs. {bidAmounts[winner[0].participant._id]}
                </Text>
              </Box>
            </Card>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default AuctionEnded;
