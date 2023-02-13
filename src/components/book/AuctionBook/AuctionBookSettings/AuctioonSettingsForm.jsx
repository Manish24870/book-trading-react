import {
  Text,
  TextInput,
  Box,
  Container,
  Card,
  Title,
  Button,
  Flex,
  Group,
  Image,
  Badge,
} from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";

const AuctionSettingsForm = (props) => {
  const form = useForm({
    initialValues: {},
  });

  return (
    <Box mt={40}>
      <Container size="sm">
        <Card withBorder mx="auto" shadow="xl" p={26}>
          <Title order={4} mb={16}>
            Edit your auction
          </Title>
          <Card withBorder mb={12}>
            <Group spacing="xl">
              <Image
                src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.book.images[0].url}
                width={70}
                height={90}
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
              </Flex>
            </Group>
          </Card>

          <form>
            <Flex direction="column">
              <Flex justify="flex-end">
                <Button>Start Auction</Button>
                <Button ml={12}>Save</Button>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default AuctionSettingsForm;
