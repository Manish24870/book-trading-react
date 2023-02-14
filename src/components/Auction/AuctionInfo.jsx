import { Box, Card, Flex, Text, Badge, Group, Image, Button, NumberInput } from "@mantine/core";
import { BiData } from "react-icons/bi";

const AuctionInfo = (props) => {
  return (
    <Box>
      <Card withBorder shadow="md" mb={12}>
        <Group spacing="xl">
          <Image
            // src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.book.images[0].url}
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            width={90}
            height={120}
            radius="sm"
            py={6}
          />
          <Flex direction="column">
            <Text weight={500}>{"props.auction.book.title"}</Text>
            <Text color="dimmed" size="sm">
              {"props.auction.book.isbn"}
            </Text>
            {/* {props.auction.book.category.map((el) => ( */}
            <Badge key={"el"} radius="sm">
              {"el"}
            </Badge>
            {/* ))} */}
          </Flex>
        </Group>
      </Card>
      <Card withBorder shadow="md" mb={12}>
        <Text weight={500} mb={16}>
          Auction Statistics
        </Text>
        <Flex justify="space-between">
          <Box sx={{ textAlign: "center" }}>
            <Text>Total Bidders</Text>
            <Text weight={600} size="xl" color="secondary">
              20
            </Text>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Text>Highest Bid</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 1550
            </Text>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Text>Total Money</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 20,000
            </Text>
          </Box>
        </Flex>
      </Card>
      <Card withBorder shadow="md">
        <Text weight={500} mb={16}>
          Place Bid
        </Text>
        <Flex justify="space-between">
          <Box sx={{ textAlign: "center" }}>
            <Text>Your current bid</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 1250
            </Text>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <NumberInput />
            <Button mt={14} leftIcon={<BiData size={18} />}>
              Place Bid
            </Button>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Text>Your new bid</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 1550
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default AuctionInfo;
