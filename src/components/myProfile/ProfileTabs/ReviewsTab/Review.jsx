import { Card, Avatar, Text, Box, Badge, Flex, Rating, useMantineTheme } from "@mantine/core";
import {
  TbMoodCry,
  TbMoodEmpty,
  TbMoodSad,
  TbMoodSmile,
  TbMoodHappy,
  TbMoodCrazyHappy,
} from "react-icons/tb";

import timeSince from "../../../../utils/timeSince";

const Review = (props) => {
  const theme = useMantineTheme();

  const getEmptyIcon = (value) => {
    const defaultProps = { size: 30, color: "gray" };
    switch (value) {
      case 1:
        return <TbMoodCry {...defaultProps} />;
      case 2:
        return <TbMoodSad {...defaultProps} />;
      case 3:
        return <TbMoodSmile {...defaultProps} />;
      case 4:
        return <TbMoodHappy {...defaultProps} />;
      case 5:
        return <TbMoodCrazyHappy {...defaultProps} />;
      default:
        return <TbMoodEmpty {...defaultProps} />;
    }
  };

  const getFullIcon = (value) => {
    const defaultProps = { size: 30 };

    switch (value) {
      case 1:
        return <TbMoodCry {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <TbMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return <TbMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />;
      case 4:
        return <TbMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return <TbMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />;
      default:
        return <TbMoodEmpty {...defaultProps} />;
    }
  };
  return (
    <Card withBorder shadow="md">
      <Flex gap={20}>
        <Avatar
          radius="xl"
          size="lg"
          src={process.env.REACT_APP_BASE_IMAGE_URL + props.review.reviewedBy.photo}
        />
        <Box>
          <Text>{props.review.reviewedBy.username}</Text>
          <Text color="dimmed">{props.review.reviewedBy.email}</Text>
        </Box>
      </Flex>

      <Flex mt={20} justify="space-between">
        <Rating
          value={props.review.reviewNumber}
          emptySymbol={getEmptyIcon}
          fullSymbol={getFullIcon}
          size="lg"
          highlightSelectedOnly
          readOnly
        />

        <Text color="primary">{timeSince(new Date(props.review.reviewedAt)) + " ago"}</Text>
      </Flex>
      <Text color="dimmed" mt={20}>
        {props.review.reviewText}
      </Text>
    </Card>
  );
};

export default Review;
