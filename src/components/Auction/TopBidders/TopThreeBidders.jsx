import { Box, Text, Modal } from "@mantine/core";

import TopThreeBidder from "./TopThreeBidder";

const TopThreeBidders = (props) => {
  // Calculate total bid amount and sort bidders by their bid amount
  let bidderInfos = props.bidders.map((el) => {
    let totalBidAmount = 0;
    el.bids.forEach((bid) => {
      totalBidAmount += bid.amount;
    });
    return {
      ...el,
      totalBidAmount,
    };
  });
  bidderInfos.sort((a, b) => b.totalBidAmount - a.totalBidAmount);
  const topThree = bidderInfos.splice(0, 3);

  let renderBids = topThree.map((bidder) => <TopThreeBidder key={bidder._id} bidder={bidder} />);

  return <Box>{renderBids}</Box>;
};

export default TopThreeBidders;
