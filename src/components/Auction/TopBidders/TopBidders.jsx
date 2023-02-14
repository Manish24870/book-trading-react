import { Box, Text, Modal } from "@mantine/core";

import TopBidder from "./TopBidder";

const TopBidders = (props) => {
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

  return (
    <Modal centered opened={props.open} onClose={() => props.setOpen(false)}>
      <Text size="lg" weight={500} mb={12}>
        Top Bidders
      </Text>
      {props.open && bidderInfos.map((bidder) => <TopBidder key={bidder._id} bidder={bidder} />)}
    </Modal>
  );
};

export default TopBidders;
