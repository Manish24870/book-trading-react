import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Title,
  Text,
  Button,
  SimpleGrid,
  Group,
  Badge,
  Flex,
  useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../common/Loading";
import Review from "./Review";

const ReviewsTab = (props) => {
  const { myProfile, myProfileLoading } = useSelector((state) => state.profile);

  let renderReviews = <Loading />;
  var totalReview = 0;

  if (myProfileLoading) {
    renderReviews = <Loading />;
  } else if (myProfile && myProfile.reviews && myProfile.reviews.length > 0) {
    myProfile.reviews.map((review) => {
      totalReview += review.reviewNumber;
    });
    renderReviews = myProfile.reviews.map((review) => (
      <Review key={review.transaction} review={review} />
    ));
  } else {
    renderReviews = <Text>You do not have any reviews</Text>;
  }

  return (
    <Box mt={16}>
      {myProfile && myProfile.reviews && myProfile.reviews.length > 0 && (
        <Card withBorder mb={12}>
          <Flex align="center" justify="center">
            <Text>Average review score of </Text>
            <Badge mx="sm" size="lg" radius="sm">
              {totalReview}
            </Badge>
            {/* <Text color="primary" size="xl" weight={600}>
              {` ${totalReview} `}
            </Text> */}
            <Text> from </Text>
            <Badge mx="sm" size="lg" radius="sm">
              {myProfile.reviews.length}
            </Badge>
            {/* <Text color="primary" size="xl" weight={600}>
              {` ${myProfile.reviews.length} `}
            </Text> */}
            <Text> reviews</Text>
          </Flex>
        </Card>
      )}
      <SimpleGrid spacing={30} cols={2} breakpoints={[{ maxWidth: "sm", cols: 1, spacing: "sm" }]}>
        {renderReviews}
      </SimpleGrid>
    </Box>
  );
};

export default ReviewsTab;
