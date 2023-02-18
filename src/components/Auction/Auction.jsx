import { Box, Text, Grid, Container, Button, Card } from "@mantine/core";
import { useState, useRef, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../common/Loading";
import TopBidders from "./TopBidders/TopBidders";
import TopThreeBidders from "./TopBidders/TopThreeBidders";
import AuctionInfo from "./AuctionInfo";
import AuctionActivities from "./AuctionActivities";
import AuctionNotStarted from "./AuctionNotStarted";
import AuctionEnded from "./AuctionEnded";
import SmallTimer from "../common/SmallTimer";
import { SocketContext } from "../../context/socket";
import { getAuction, updateAuctionAfterBid } from "../../features/auction/auctionSlice";

const Auction = (props) => {
  const [biddersOpen, setBiddersOpen] = useState(false);

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const params = useParams();
  const { auction, fetchAuctionLoading, isSuccess } = useSelector((state) => state.auction);
  const currentUserId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(getAuction(params.bookId));

    socket.on("placedBidResponse", (data) => {
      if (currentUserId !== data.bidderId) dispatch(updateAuctionAfterBid(data.auction));
      // dispatch(updateAuctionAfterBid(data.auction));
    });

    // When the auction is started on the scheduled date
    socket.on("auctionStarted", (startedAuction) => {
      if (startedAuction?._id === auction?._id) {
        dispatch(getAuction(params.bookId));
      }
    });
    socket.on("auctionEnded", (endedAuction) => {
      if (endedAuction?._id === auction?._id) {
        dispatch(getAuction(params.bookId));
      }
    });
  }, []);

  let renderAuction = <Loading />;
  if (fetchAuctionLoading) {
    renderAuction = <Loading />;
  } else if (isSuccess && auction) {
    renderAuction = (
      <Container size="lg">
        {!auction.started ? (
          <AuctionNotStarted auction={auction} />
        ) : auction.started && auction.completed ? (
          <AuctionEnded auction={auction} />
        ) : (
          <>
            <TopBidders
              open={biddersOpen}
              setOpen={setBiddersOpen}
              bidders={auction.participants}
            />
            <Text mb={10}>Auction Page</Text>
            <Grid columns={12}>
              <Grid.Col span={8}>
                <AuctionInfo auction={auction} />
              </Grid.Col>
              <Grid.Col span={4}>
                <Card withBorder shadow="md" p="xs">
                  <Text size="lg" weight={500} mb={12}>
                    Top Bidders
                  </Text>

                  <TopThreeBidders bidders={auction.participants} />
                  <Button onClick={() => setBiddersOpen(true)}>All Bidders</Button>
                </Card>
                <Card withBorder shadow="md" p="xs" mt={16}>
                  <SmallTimer deadline={auction.schedule.endDate} label="Auction ends in" />
                </Card>
              </Grid.Col>
            </Grid>
            <AuctionActivities activities={auction.activities} />
          </>
        )}
      </Container>
    );
  }

  return <Box mt={14}>{renderAuction}</Box>;
};

export default Auction;
