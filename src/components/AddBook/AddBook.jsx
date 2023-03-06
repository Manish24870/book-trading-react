import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Button, Container, Title, Card } from "@mantine/core";
import axios from "axios";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import { useSelector, useDispatch } from "react-redux";

import SearchIsbn from "./SearchIsbn";
import ScanIsbn from "./ScanIsbn";
import AddBookForm from "./AddBookForm";
import { reset, addBook } from "../../features/book/bookSlice";
import { successNotification, errorNotification } from "../../utils/notification/showNotification";

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
  publisher: Joi.any(),
  language: Joi.string().required().messages({
    "string.empty": "Book language is required",
  }),
  bookQuality: Joi.string().required().messages({
    "string.empty": "Book quality is required",
  }),
  images: Joi.array(),
  price: Joi.number().required().messages({
    "string.empty": "Book price is required",
  }),
  maturity: Joi.any(),
});

const AddBook = (props) => {
  const [searchIsbnOpened, setSearchIsbnOpened] = useState(false);
  const [scanIsbnOpened, setScanIsbnOpened] = useState(false);
  const [searchIsbn, setSearchIsbn] = useState("");
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isError, isSuccess, addBookSuccess, addBookLoading } = useSelector(
    (state) => state.book
  );

  useEffect(() => {
    // Check for book adding error
    if (isError) {
      if (typeof error === "string") {
        errorNotification({
          title: "Error adding book",
          message: error,
        });
      } else if (typeof error === "object") {
        form.setErrors(error);
      }
    }

    // Check for book add success
    if (addBookSuccess) {
      successNotification({
        title: "Book add successful",
        message: "Book successfully added as a listing",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, isSuccess, isError, addBookSuccess]);

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
      maturity: "",
      bookQuality: "",
      images: [],
      price: 0,
    },
  });

  // Search book information by ISBN
  const searchIsbnBookHandler = async (isbn) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    if (response.data.items.length > 0) {
      const book = response.data.items[0].volumeInfo;
      form.setValues((prev) => ({
        ...prev,
        title: book.title,
        author: book.authors.toString(),
        category: book.categories,
        description: book.description,
        isbn: isbn,
        maturity: book.maturityRating ? book.maturityRating : "",
        publishedDate: book.publishedDate,
        publisher: book.publisher ? book.publisher : "",
        language: book.language,
      }));
      setShowForm(true);
      setSearchIsbnOpened(false);
      setScanIsbnOpened(false);
    }
  };

  // When the qr code is successfully scanned
  const qrCodeScanSuccessHandler = (decodedText) => {
    setSearchIsbn(decodedText);
    searchIsbnBookHandler(decodedText);
  };

  const onImageDropHandler = (files) => {
    form.setFieldValue("images", files);
  };

  const resetForm = () => {
    form.setValues({
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
      price: 0,
    });
    setShowForm(true);
  };

  // When the book form gets submitted
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      let bookData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "images") {
          for (let i = 0; i < form.values.images.length; i++) {
            bookData.append("images", form.values.images[i]);
          }
        } else {
          bookData.append([value], form.values[value]);
        }
      });
      dispatch(addBook(bookData));
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
            <Button onClick={() => setScanIsbnOpened(true)}>Scan ISBN</Button>
            <Button onClick={() => setSearchIsbnOpened(true)}>Search By ISBN</Button>
            <Button onClick={resetForm}>Manual</Button>
            <SearchIsbn
              searchIsbn={searchIsbn}
              setSearchIsbn={setSearchIsbn}
              opened={searchIsbnOpened}
              setOpened={setSearchIsbnOpened}
              searchIsbnBookHandler={searchIsbnBookHandler}
            />
            <ScanIsbn
              opened={scanIsbnOpened}
              setOpened={setScanIsbnOpened}
              qrCodeScanSuccessHandler={qrCodeScanSuccessHandler}
            />
          </Flex>
        </Card>

        {showForm ? (
          <AddBookForm
            form={form}
            formSubmitHandler={formSubmitHandler}
            onImageDropHandler={onImageDropHandler}
            addBookLoading={addBookLoading}
          />
        ) : null}
      </Container>
    </Box>
  );
};

export default AddBook;
