import {
  Box,
  Button,
  UnstyledButton,
  Checkbox,
  Badge,
  Card,
  Image,
  Text,
  Group,
} from "@mantine/core";

const OfferItem = (props) => {
  return (
    <UnstyledButton mb={16} onClick={() => props.onExchangeBookSelect(props.book._id)}>
      <Card withBorder p="xs">
        <Group>
          <Checkbox checked={props.selectedBooks.includes(props.book._id)} />
          <Image
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.book.images[0].url}
            height={100}
            width={70}
          />
          <Box>
            <Text weight={500}>{props.book.title}</Text>
            <Text color="dimmed" size="sm">
              {props.book.isbn}
            </Text>
            <Badge radius="sm" size="sm">
              {props.book.author}
            </Badge>
          </Box>
        </Group>
      </Card>
    </UnstyledButton>
  );
};

export default OfferItem;
