import { useState, useEffect } from "react";
import { Box, Card, Title, Text, Button, Group, useMantineTheme, SimpleGrid } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../common/Loading";
import { getMyBooks } from "../../../../features/user/userSlice";
import Book from "./Book";

const BooksTab = (props) => {
  const dispatch = useDispatch();

  const { myBooks, isSuccess, isError, error, myBooksLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyBooks());
  }, []);

  let renderBooks = <Loading />;

  if (myBooksLoading) {
    renderBooks = <Loading />;
  } else if (isSuccess && myBooks) {
    renderBooks = myBooks.map((book) => <Book key={book._id} book={book} />);
  }

  return (
    <Box mt={16}>
      <SimpleGrid cols={3}>{renderBooks}</SimpleGrid>
    </Box>
  );
};

export default BooksTab;
