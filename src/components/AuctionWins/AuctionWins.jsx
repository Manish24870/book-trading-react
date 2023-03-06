import { Card, Box, Flex, Text, Image, Avatar, Container } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../common/Loading";
import AuctionItem from "./AuctionItem";
import { getMyAuctionWins } from "../../features/user/userSlice";

const AuctionWins = (props) => {
  const dispatch = useDispatch();
  const { myAuctionWins, myAuctionWinsLoading, isSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyAuctionWins());
  }, []);

  let renderWins = <Loading />;

  if (myAuctionWinsLoading) {
    renderWins = <Loading />;
  } else if (myAuctionWins && isSuccess) {
    renderWins = myAuctionWins.map((auction) => (
      <AuctionItem key={auction._id} auction={auction} />
    ));
  }

  return (
    <Container size="md" mt={16}>
      <Text weight={500} size="lg" mb={20}>
        My auction wins
      </Text>
      {renderWins}
    </Container>
  );
};

export default AuctionWins;
