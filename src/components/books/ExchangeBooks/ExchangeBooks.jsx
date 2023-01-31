import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Title } from "@mantine/core";

import { reset, fetchBooks } from "../../../features/book/booksSlice";
import { errorNotification } from "../../../utils/notification/showNotification";
import Loading from "../../common/Loading";
import BooksList from "../common/BooksList";

const ExchangeBooks = (props) => {
  const dispatch = useDispatch();
  const { error, isError, isSuccess, fetchBooksLoading, books } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks("Exchange"));
  }, []);

  useEffect(() => {
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

  let renderBooks = <Loading />;

  if (fetchBooksLoading) {
    renderBooks = <Loading />;
  } else if (isSuccess && books.length >= 0 && !fetchBooksLoading) {
    renderBooks = <BooksList books={books} />;
  }

  return (
    <Box mt={8}>
      <Container size="lg">
        <Title order={4} mb={8}>
          Exchange Books
        </Title>
        {renderBooks}
      </Container>
    </Box>
  );
};

export default ExchangeBooks;
