import { Box, Flex, Button, TextInput, Container, Title, Card } from "@mantine/core";

const AddBook = (props) => {
  return (
    <Box mt={20}>
      <Container size="sm">
        <Card withBorder mx="auto" shadow="xl" p={20}>
          <Title order={4} mb={16}>
            Add a new book
          </Title>
          <Flex justify="space-between">
            <Button>Scan ISBN</Button>
            <Button>Search By ISBN</Button>
            <Button>Manual</Button>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
};

export default AddBook;
