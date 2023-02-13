import { Text, Title, Box, Container } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { getAuction } from "../../../../features/auction/auctionSlice";
import Loading from "../../../common/Loading";
import AuctionSettingsForm from "./AuctionSettingsForm";

const AuctionBookSettings = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { error, isError, isSuccess, auction, fetchAuctionLoading } = useSelector(
    (state) => state.auction
  );

  // Fetch the auction
  useEffect(() => {
    dispatch(getAuction(params.bookId));
  }, []);

  console.log(auction);

  let renderAuction = <Loading />;
  if (fetchAuctionLoading) {
    renderAuction = <Loading />;
  } else if (isSuccess && auction) {
    renderAuction = <AuctionSettingsForm auction={auction} />;
  }

  return (
    <Box mt={20}>
      <Container size="lg">{renderAuction}</Container>
    </Box>
  );
};

export default AuctionBookSettings;
