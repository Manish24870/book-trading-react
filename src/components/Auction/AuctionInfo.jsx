import {
  Box,
  Card,
  Flex,
  Text,
  Badge,
  Group,
  Image,
  Button,
  Avatar,
  NumberInput,
} from "@mantine/core";
import { BiData } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { placeBid } from "../../features/auction/auctionSlice";
import { successNotification } from "../../utils/notification/showNotification";

const AuctionInfo = (props) => {
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState(0);

  const { isBidSuccess, isPlaceBidLoading } = useSelector((state) => state.auction);

  // When user clicks on the place id button
  const placeBidHandler = () => {
    dispatch(
      placeBid({
        bookId: props.auction.book._id,
        bidInfo: {
          amount: bidAmount,
        },
      })
    );
  };

  useEffect(() => {
    if (isBidSuccess) {
      successNotification({ title: "Success", message: "Bid placed successfully" });
    }
  }, [isBidSuccess]);

  return (
    <Box>
      <Card withBorder shadow="md" mb={12}>
        <Group spacing="xl">
          <Image
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.book.images[0].url}
            width={90}
            height={120}
            radius="sm"
            py={6}
          />
          <Flex direction="column">
            <Text weight={500}>{props.auction.book.title}</Text>
            <Text color="dimmed" size="sm">
              {props.auction.book.isbn}
            </Text>
            {props.auction.book.category.map((el) => (
              <Badge key={el} radius="sm">
                {el}
              </Badge>
            ))}
            <Flex mt={16}>
              <Avatar
                radius="xl"
                src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.owner.photo}
              />
              <Box ml={12}>
                <Text weight={600} size="xs">
                  {props.auction.owner.name}
                </Text>
                <Text size="xs">{props.auction.owner.email}</Text>
              </Box>
            </Flex>
          </Flex>
        </Group>
      </Card>
      <Card withBorder shadow="md" mb={12}>
        <Text weight={500} mb={16}>
          Auction Statistics
        </Text>
        <Flex justify="space-between">
          <Box sx={{ textAlign: "center" }}>
            <Text>Total Bidders</Text>
            <Text weight={600} size="xl" color="secondary">
              20
            </Text>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Text>Highest Bid</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 1550
            </Text>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Text>Total Money</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 20,000
            </Text>
          </Box>
        </Flex>
      </Card>
      <Card withBorder shadow="md">
        <Text weight={500} mb={16}>
          Place Bid
        </Text>
        <Flex justify="space-between">
          <Box sx={{ textAlign: "center" }}>
            <Text>Your current bid</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 1250
            </Text>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <NumberInput min={0} value={bidAmount} onChange={(val) => setBidAmount(val)} />
            <Button
              mt={14}
              leftIcon={<BiData size={18} />}
              disabled={bidAmount <= 0}
              onClick={placeBidHandler}
              loading={isPlaceBidLoading}
            >
              Place Bid
            </Button>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Text>Your new bid</Text>
            <Text weight={600} size="xl" color="secondary">
              Rs. 1550
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default AuctionInfo;
