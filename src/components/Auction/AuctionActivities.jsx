import { Box, Card, Text, Flex, useMantineTheme } from "@mantine/core";
import { BiData } from "react-icons/bi";

const AuctionActivities = (props) => {
  const theme = useMantineTheme();

  return (
    <Box mt={20}>
      <Text size="lg" weight={500} mb={12}>
        Activities
      </Text>
      <Card withBorder mb={16}>
        <Flex>
          <BiData size={20} color={theme.colors.primary[6]} />
          <Text ml={16}>
            Rohan Prasai placed a new bid of <b>Rs. 250</b>
          </Text>
          <Text color="dimmed" sx={{ marginLeft: "auto" }}>
            {new Date().toLocaleString()}
          </Text>
        </Flex>
      </Card>
      <Card withBorder mb={16}>
        <Flex>
          <BiData size={20} color={theme.colors.primary[6]} />
          <Text ml={16}>
            Rohan Prasai placed a new bid of <b>Rs. 250</b>
          </Text>
          <Text color="dimmed" sx={{ marginLeft: "auto" }}>
            {new Date().toLocaleString()}
          </Text>
        </Flex>
      </Card>
      <Card withBorder mb={16}>
        <Flex>
          <BiData size={20} color={theme.colors.primary[6]} />
          <Text ml={16}>
            Rohan Prasai placed a new bid of <b>Rs. 250</b>
          </Text>
          <Text color="dimmed" sx={{ marginLeft: "auto" }}>
            {new Date().toLocaleString()}
          </Text>
        </Flex>
      </Card>
      <Card withBorder mb={16}>
        <Flex>
          <BiData size={20} color={theme.colors.primary[6]} />
          <Text ml={16}>
            Rohan Prasai placed a new bid of <b>Rs. 250</b>
          </Text>
          <Text color="dimmed" sx={{ marginLeft: "auto" }}>
            {new Date().toLocaleString()}
          </Text>
        </Flex>
      </Card>
    </Box>
  );
};

export default AuctionActivities;
