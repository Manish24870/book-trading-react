import { Box, Text, Modal } from "@mantine/core";

import TopBidder from "./TopBidder";

const TopBidders = (props) => {
  return (
    <Modal centered opened={props.open} onClose={() => props.setOpen(false)}>
      <Text size="lg" weight={500} mb={12}>
        Top Bidders
      </Text>
      <TopBidder />
      <TopBidder />
      <TopBidder />
      <TopBidder />
      <TopBidder />
    </Modal>
  );
};

export default TopBidders;
