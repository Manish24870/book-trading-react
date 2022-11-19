import { useState } from "react";
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
import axios from "axios";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

import SearchIsbn from "./SearchIsbn";

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
let bookAuthors = [];

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

const schema = Joi.object({
  listing: Joi.string().required().messages({
    "string.empty": "Listing type is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Book title is required",
  }),
  author: Joi.array().required().messages({
    "string.empty": "Book author is required",
  }),
  category: Joi.array().required().messages({
    "string.empty": "Book category is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Book description is required",
  }),
  isbn: Joi.string().required().messages({
    "string.empty": "Book ISBN is required",
  }),
  pageCount: Joi.any(),
  publishedDate: Joi.string().required().messages({
    "string.empty": "Published date is required",
  }),
  publisher: Joi.string().required().messages({
    "string.empty": "Publisher is required",
  }),
  language: Joi.string().required().messages({
    "string.empty": "Book language is required",
  }),
  bookQuality: Joi.string().required().messages({
    "string.empty": "Book quality is required",
  }),
  images: Joi.any(),
  price: Joi.string().required().messages({
    "string.empty": "Book price is required",
  }),
});

const AddBook = (props) => {
  const [searchIsbnOpened, setSearchIsbnOpened] = useState(false);
  const [searchIsbn, setSearchIsbn] = useState("");

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      listing: "",
      title: "",
      author: "",
      category: "",
      description: "",
      isbn: "",
      publishedDate: "",
      publisher: "",
      language: "",
      bookQuality: "",
      images: "",
      price: "",
    },
  });

  const searchIsbnClickHandler = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchIsbn}`
    );
    if (response.data.items.length > 0) {
      console.log(response.data.items[0]);
      const book = response.data.items[0].volumeInfo;
      form.setValues((prev) => ({
        ...prev,
        title: book.title,
        author: book.authors,
        category: book.categories,
        description: book.description,
        isbn: searchIsbn,
        publishedDate: book.publishedDate,
        publisher: book.publisher,
        language: book.language,
      }));
      bookAuthors = [...bookAuthors, ...book.authors];
      setSearchIsbnOpened(false);
    }
  };

  console.log(form.values, bookAuthors);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      console.log(form.values);
    }
  };

  return (
    <Box mt={20}>
      <Container size="sm">
        <Card withBorder mx="auto" p={20}>
          <Title order={4} mb={16}>
            Add a new book
          </Title>
          <Flex justify="space-between">
            <Button>Scan ISBN</Button>
            <Button onClick={() => setSearchIsbnOpened(true)}>Search By ISBN</Button>
            <Button>Manual</Button>
            <SearchIsbn
              searchIsbn={searchIsbn}
              setSearchIsbn={setSearchIsbn}
              opened={searchIsbnOpened}
              setOpened={setSearchIsbnOpened}
              searchIsbnClickHandler={searchIsbnClickHandler}
            />
          </Flex>
        </Card>
        {searchIsbn ? (
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
                <MultiSelect
                  label="Author"
                  placeholder="Book author"
                  {...form.getInputProps("author")}
                  mb={12}
                  data={bookAuthors}
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
                  {...form.getInputProps("quality")}
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
                <Button mt={30} fullWidth type="submit">
                  Add
                </Button>
              </Flex>
            </form>
          </Card>
        ) : null}
      </Container>
    </Box>
  );
};

export default AddBook;
