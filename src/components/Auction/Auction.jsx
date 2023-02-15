import { Box, Text, Grid, Container, Button, Card } from "@mantine/core";
import { useState, useRef, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../common/Loading";
import TopBidders from "./TopBidders/TopBidders";
import TopBidder from "./TopBidders/TopBidder";
import AuctionInfo from "./AuctionInfo";
import AuctionActivities from "./AuctionActivities";
import { SocketContext } from "../../context/socket";
import { getAuction, updateAuctionAfterBid } from "../../features/auction/auctionSlice";

const Auction = (props) => {
  const [biddersOpen, setBiddersOpen] = useState(false);

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const params = useParams();
  const { auction, fetchAuctionLoading, isSuccess } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getAuction(params.bookId));

    socket.on("placedBidResponse", (data) => {
      dispatch(updateAuctionAfterBid(data));
    });
  }, []);

  let renderAuction = <Loading />;
  if (fetchAuctionLoading) {
    renderAuction = <Loading />;
  } else if (isSuccess && auction) {
    renderAuction = (
      <Container size="lg">
        <TopBidders open={biddersOpen} setOpen={setBiddersOpen} bidders={auction.participants} />
        <Text mb={10}>Auction Page</Text>
        <Grid columns={12}>
          <Grid.Col span={8}>
            <AuctionInfo auction={auction} />
          </Grid.Col>
          <Grid.Col span={4}>
            <Card withBorder shadow="md">
              <Text size="lg" weight={500} mb={12}>
                Top Bidders
              </Text>
              {/* <TopBidder />
              <TopBidder />
              <TopBidder /> */}
              <Button variant="light" color="secondary" onClick={() => setBiddersOpen(true)}>
                All Bidders
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
        <AuctionActivities activities={auction.activities} />
      </Container>
    );
  }

  return <Box mt={14}>{renderAuction}</Box>;
};

export default Auction;
