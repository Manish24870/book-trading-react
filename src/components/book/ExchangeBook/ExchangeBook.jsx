import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Title } from "@mantine/core";

import { reset, fetchBook } from "../../../features/book/bookSlice";
import { getMyInitiates } from "../../../features/exchange/exchangeSlice";
import Loading from "../../common/Loading";
import { errorNotification } from "../../../utils/notification/showNotification";
import ExchangeBookInfo from "./ExchangeBookInfo";
import BookDiscussion from "../common/BookDiscussion";
import RecommendedBooks from "../common/RecommendedBooks";

const ExchangeBook = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { error, isError, isSuccess, fetchBookLoading, book } = useSelector((state) => state.book);
  const currentUserId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(fetchBook(params.bookId));
    dispatch(getMyInitiates());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Book error", message: error });
    }
  }, [dispatch, isSuccess, isError, book]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  let renderBook = <Loading />;

  if (fetchBookLoading) {
    renderBook = <Loading />;
  } else if (isSuccess && book && !fetchBookLoading) {
    renderBook = (
      <>
        <ExchangeBookInfo book={book} currentUserId={currentUserId} />
        <BookDiscussion discussion={book.discussion} />
        <RecommendedBooks recommendedBooks={book.recommendedBooks} />
      </>
    );
  }

  return (
    <Box mt={20}>
      <Container size="lg">{renderBook}</Container>
    </Box>
  );
};

export default ExchangeBook;
