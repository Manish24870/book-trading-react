import { Box, Text, Grid, Container, Button, Card } from "@mantine/core";
import { useState } from "react";

import TopBidders from "./TopBidders/TopBidders";
import TopBidder from "./TopBidders/TopBidder";
import AuctionInfo from "./AuctionInfo";
import AuctionActivities from "./AuctionActivities";

const Auction = (props) => {
  const [biddersOpen, setBiddersOpen] = useState(false);

  return (
    <Box mt={14}>
      <Container size="lg">
        <TopBidders open={biddersOpen} setOpen={setBiddersOpen} />
        <Text mb={10}>Auction Page</Text>
        <Grid columns={12}>
          <Grid.Col span={8}>
            <AuctionInfo />
          </Grid.Col>
          <Grid.Col span={4}>
            <Card withBorder shadow="md">
              <Text size="lg" weight={500} mb={12}>
                Top Bidders
              </Text>
              <TopBidder />
              <TopBidder />
              <TopBidder />
              <Button variant="light" color="secondary" onClick={() => setBiddersOpen(true)}>
                All Bidders
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
        <AuctionActivities />
      </Container>
    </Box>
  );
};

export default Auction;
