import {
  Box,
  Flex,
  Button,
  Select,
  TextInput,
  MultiSelect,
  NumberInput,
  Container,
  Title,
  Card,
  Textarea,
} from "@mantine/core";

import AddBookImages from "./AddBookImages";

const listingFor = ["Sell", "Exchange", "Auction"];

const bookCategories = [
  "Antiques & Collectibles",
  "Architecture",
  "Art",
  "Bibles",
  "Biography & Autobiography",
  "Body, Mind & Spirit",
  "Business & Economics",
  "Comics & Graphic Novels",
  "Computers",
  "Cooking",
  "Crafts & Hobbies",
  "Design",
  "Drama",
  "Education",
  "Family & Relationships",
  "Fiction",
  "Foreign Language Study",
  "Games & Activities",
  "Gardening",
  "Health & Fitness",
  "History",
  "House & Home",
  "Humor",
  "Juvenile Fiction",
  "Juvenile Nonfiction",
  "Language Arts & Disciplines",
  "Law",
  "Literary Collections",
  "Literary Criticism",
  "Mathematics",
  "Medical",
  "Music",
  "Nature",
  "Performing Arts",
  "Pets",
  "Philosophy",
  "Poetry",
  "Political Science",
  "Psychology",
  "Reference",
  "Religion",
  "Science",
  "Self-Help",
  "Social Science",
  "Sports & Recreation",
  "Study Aids",
  "Technology & Engineering",
  "Transportation",
  "Travel",
  "True Crime",
  "Young Adult Fiction",
  "Young Adult Nonfiction",
];

const bookQuality = [
  {
    value: "1",
    label: "1 (bad)",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5 (great)",
  },
];

const AddBookForm = ({ form, formSubmitHandler, onImageDropHandler }) => {
  return (
    <Card withBorder mx="auto" shadow="xl" p={20} mt={20}>
      <Title order={4} mb={16}>
        Book details
      </Title>
      <form onSubmit={formSubmitHandler}>
        <Flex direction="column">
          <Select
            label="Listing"
            placeholder="Listing for"
            data={listingFor}
            {...form.getInputProps("listing")}
            mb={12}
          />
          <TextInput
            label="ISBN"
            placeholder="ISBN number"
            {...form.getInputProps("isbn")}
            mb={12}
          />
          <TextInput
            label="Title"
            placeholder="Book title"
            {...form.getInputProps("title")}
            mb={12}
          />
          <TextInput
            label="Author"
            placeholder="Book author"
            {...form.getInputProps("author")}
            mb={12}
            data={form.values.author}
          />
          <MultiSelect
            label="Category"
            placeholder="Book category"
            {...form.getInputProps("category")}
            mb={12}
            data={bookCategories}
          />
          <Textarea
            label="Description"
            placeholder="Book description"
            {...form.getInputProps("description")}
            mb={12}
            maxRows={2}
          />
          <TextInput
            label="Published date"
            placeholder="Published date"
            {...form.getInputProps("publishedDate")}
            mb={12}
          />
          <TextInput
            label="Publisher"
            placeholder="Book publisher"
            {...form.getInputProps("publisher")}
            mb={12}
          />
          <TextInput
            label="Language"
            placeholder="Book language"
            {...form.getInputProps("language")}
            mb={12}
          />
          <Select
            label="Quality"
            placeholder="Book quality"
            {...form.getInputProps("bookQuality")}
            data={bookQuality}
            mb={12}
          />

          <NumberInput
            label="Price"
            placeholder="Book price"
            {...form.getInputProps("price")}
            mb={12}
            min={0}
          />
          <AddBookImages images={form.values.images} onImageDropHandler={onImageDropHandler} />
          <Button mt={30} fullWidth type="submit">
            Add
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

export default AddBookForm;
