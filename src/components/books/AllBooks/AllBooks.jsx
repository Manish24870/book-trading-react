import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Button, Container, Title, Card } from "@mantine/core";

import { reset, fetchBooks } from "../../../features/book/booksSlice";
import { errorNotification } from "../../../utils/notification/showNotification";
import Loading from "../../common/Loading";
import BooksList from "./BooksList";

const AllBooks = (props) => {
  const dispatch = useDispatch();
  const { error, isError, isSuccess, fetchBooksLoading, books } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks("all"));
  }, []);

  useEffect(() => {
    // Check for fetch books error
    if (isError) {
      errorNotification({ title: "Books error", message: "Error fetching books" });
      dispatch(reset());
    }
  }, [dispatch, isSuccess, isError, books]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  let renderBooks = <BooksList />;

  return (
    <Box mt={20}>
      <Container size="lg">{renderBooks}</Container>
    </Box>
  );
};

export default AllBooks;
