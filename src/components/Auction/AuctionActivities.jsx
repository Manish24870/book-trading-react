import { Box, Card, Text, Flex, useMantineTheme } from "@mantine/core";
import { BiData } from "react-icons/bi";

const AuctionActivities = (props) => {
  const theme = useMantineTheme();
  console.log(props);
  const reversedArray = [...props.activities];
  reversedArray.reverse();

  return (
    <Box mt={20}>
      <Text size="lg" weight={500} mb={12}>
        Activities
      </Text>
      {reversedArray.map((activity) => (
        <Card withBorder mb={16} key={activity._id}>
          <Flex>
            <BiData size={20} color={theme.colors.primary[6]} />
            <Text ml={16}>
              {activity.user.name + " placed a new bid of "}
              <b>{`Rs. ${activity.data.bidAmount}`}</b>
            </Text>
            <Text color="dimmed" sx={{ marginLeft: "auto" }}>
              {new Date(activity.data.date).toLocaleString()}
            </Text>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};

export default AuctionActivities;
