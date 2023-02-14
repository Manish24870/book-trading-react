import { Box, Text, Avatar, Flex, Card } from "@mantine/core";

const TopBidder = (props) => {
  return (
    <Box mb={8}>
      <Card withBorder p="xs">
        <Flex>
          <Avatar
            radius="xl"
            size="lg"
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          />
          <Box ml={8}>
            <Text weight={500}>John Smith</Text>
            <Text color="dimmed">2 hours ago</Text>
          </Box>
          <Text weight={600} sx={{ marginLeft: "auto" }}>
            Rs. 450
          </Text>
        </Flex>
      </Card>
    </Box>
  );
};

export default TopBidder;
