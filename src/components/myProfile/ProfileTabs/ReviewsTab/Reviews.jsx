import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Title,
  Text,
  Button,
  SimpleGrid,
  Group,
  Flex,
  useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../common/Loading";
import Review from "./Review";

const ReviewsTab = (props) => {
  const { myProfile, myProfileLoading } = useSelector((state) => state.profile);

  let renderReviews = <Loading />;

  if (myProfileLoading) {
    renderReviews = <Loading />;
  } else if (myProfile && myProfile.reviews && myProfile.reviews.length > 0) {
    renderReviews = myProfile.reviews.map((review) => (
      <Review key={review.transaction} review={review} />
    ));
  } else {
    renderReviews = <Text>You do not have any reviews</Text>;
  }

  return (
    <Box mt={16}>
      <SimpleGrid spacing={30} cols={2}>
        {renderReviews}
      </SimpleGrid>
    </Box>
  );
};

export default ReviewsTab;
