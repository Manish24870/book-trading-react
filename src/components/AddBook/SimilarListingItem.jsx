import { Card, Box, Modal, Text, Image, Avatar, Flex, Badge } from "@mantine/core";
import { Link } from "react-router-dom";

const SimilarListingItem = (props) => {
  return (
    <Card withBorder shadow="md" mb={20}>
      <Flex gap={16}>
        <Image
          src={process.env.REACT_APP_BASE_IMAGE_URL + props.listing.images[0].url}
          height={130}
          width={80}
          radius="sm"
        />
        <Box>
          <Text weight={500}>{props.listing.title}</Text>
          <Text size="sm" color="dimmed">
            ISBN: {props.listing.isbn}
          </Text>
          <Text size="sm">
            Quality: <Badge radius="sm">{props.listing.bookQuality}</Badge>
          </Text>
        </Box>
        {props.listing.available ? (
          <Card withBorder sx={{ marginLeft: "auto" }}>
            <Flex direction="column" align="flex-end">
              {props.listing.listing === "Sell" ? (
                <Badge radius="sm" size="xl">
                  For Sell
                </Badge>
              ) : props.listing.listing === "Exchange" ? (
                <Badge radius="sm" size="xl">
                  For Exchange
                </Badge>
              ) : (
                <Badge radius="sm" size="xl">
                  For Auction
                </Badge>
              )}
              {props.listing.listing === "Sell" ? (
                <Text size="lg" weight={600} mt={10}>
                  {"Rs. " + props.listing.price}
                </Text>
              ) : props.listing.listing === "Auction" ? (
                <Text size="lg" weight={600} mt={10}>
                  {"Rs. " + props.listing.winner?.bid}
                </Text>
              ) : null}

              <Text size="sm" mt={10} color="dimmed">
                {new Date(props.listing.createdAt).toDateString()}
              </Text>
            </Flex>
          </Card>
        ) : (
          <Card withBorder sx={{ marginLeft: "auto" }}>
            <Flex direction="column" align="flex-end">
              {props.listing.listing === "Sell" ? (
                <Badge radius="sm" color="green" size="xl">
                  Sold for
                </Badge>
              ) : props.listing.listing === "Exchange" ? (
                <Badge radius="sm" color="green" size="xl">
                  Exchanged
                </Badge>
              ) : (
                <Badge radius="sm" color="green" size="xl">
                  Auctioned
                </Badge>
              )}
              {props.listing.listing === "Sell" ? (
                <Text size="lg" weight={600} mt={10}>
                  {"Rs. " + props.listing.price}
                </Text>
              ) : props.listing.listing === "Auction" ? (
                <Text size="lg" weight={600} mt={10}>
                  {"Rs. " + props.listing.winner?.bid}
                </Text>
              ) : null}

              <Text size="sm" mt={10} color="dimmed">
                {new Date(props.listing.createdAt).toDateString()}
              </Text>
            </Flex>
          </Card>
        )}
      </Flex>
      <Card withBorder mt={12}>
        <Flex gap={10} align="center">
          <Avatar
            radius="xl"
            size="md"
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.listing.owner.photo}
          />
          <Box>
            <Text>{props.listing.owner.name}</Text>
            <Text size="sm" color="dimmed">
              {props.listing.owner.email}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Card>
  );
};

export default SimilarListingItem;
