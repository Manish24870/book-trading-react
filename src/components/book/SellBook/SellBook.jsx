import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Title } from "@mantine/core";

import { reset, fetchBook } from "../../../features/book/bookSlice";
import Loading from "../../common/Loading";
import SellBookInfo from "./SellBookInfo";
import BookDiscussion from "../common/BookDiscussion";
import { errorNotification } from "../../../utils/notification/showNotification";

const SellBook = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { error, isError, isSuccess, fetchBookLoading, book } = useSelector((state) => state.book);
  const curentUserId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(fetchBook(params.bookId));
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
        <SellBookInfo book={book} curentUserId={curentUserId} />
        <BookDiscussion discussion={book.discussion} />
      </>
    );
  }

  return (
    <Box mt={20}>
      <Container size="lg">{renderBook}</Container>
    </Box>
  );
};

export default SellBook;
