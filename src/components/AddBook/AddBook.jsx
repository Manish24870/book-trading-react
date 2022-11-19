import { useState } from "react";
import { Box, Flex, Button, Container, Title, Card } from "@mantine/core";
import axios from "axios";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

import SearchIsbn from "./SearchIsbn";
import AddBookForm from "./AddBookForm";

const schema = Joi.object({
  listing: Joi.string().required().messages({
    "string.empty": "Listing type is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Book title is required",
  }),
  author: Joi.string().required().messages({
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
  price: Joi.number().required().messages({
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
      author: [],
      category: "",
      description: "",
      isbn: "",
      publishedDate: "",
      publisher: "",
      language: "",
      bookQuality: "",
      images: [],
      price: "",
    },
  });

  // Search book information by ISBN
  const searchIsbnClickHandler = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchIsbn}`
    );
    if (response.data.items.length > 0) {
      const book = response.data.items[0].volumeInfo;
      form.setValues((prev) => ({
        ...prev,
        title: book.title,
        author: book.authors.toString(),
        category: book.categories,
        description: book.description,
        isbn: searchIsbn,
        publishedDate: book.publishedDate,
        publisher: book.publisher,
        language: book.language,
      }));
      setSearchIsbnOpened(false);
    }
  };

  console.log(form.values);

  const onImageDropHandler = (files) => {
    form.setFieldValue("images", files);
  };

  // When the book form gets submitted
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
          <AddBookForm
            form={form}
            formSubmitHandler={formSubmitHandler}
            onImageDropHandler={onImageDropHandler}
          />
        ) : null}
      </Container>
    </Box>
  );
};

export default AddBook;
