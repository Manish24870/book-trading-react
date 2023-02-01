import { useEffect, useState } from "react";
import {
  Box,
  Title,
  Text,
  Card,
  Button,
  Modal,
  Flex,
  Checkbox,
  Group,
  Textarea,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../../../common/Loading";
import OfferItem from "./OfferItem";
import {
  errorNotification,
  successNotification,
} from "../../../../utils/notification/showNotification";
import { createExchange } from "../../../../features/exchange/exchangeSlice";

const MyBookOffers = (props) => {
  const dispatch = useDispatch();
  const {
    error,
    isError,
    isSuccess,
    fetchMyExchangeBooksLoading,
    myExchangeBooks,
    createExchangeSuccess,
    createExchangeLoading,
    isCreateExchangeError,
  } = useSelector((state) => state.exchange);
  const currentBookId = useSelector((state) => state.book.book._id);
  const currentBookOwner = useSelector((state) => state.book.book.owner);
  const [selectedBooks, setSelectedBooks] = useState([]);

  // If exchange is successfully created or there is an error
  useEffect(() => {
    if (createExchangeSuccess) {
      props.setOpened(false);
      successNotification({ title: "Success", message: "Book exchange initiated successfully" });
    }

    if (isCreateExchangeError) {
      errorNotification({ title: "Error", message: error });
    }
  }, [createExchangeSuccess, isCreateExchangeError]);

  // When user selects or unselects his books for exchange
  const onExchangeBookSelect = (bookId) => {
    let alreadySelected = selectedBooks.indexOf(bookId);

    if (alreadySelected > -1) {
      let newSelectedBooks = [...selectedBooks];
      newSelectedBooks.splice(alreadySelected, 1);
      setSelectedBooks(newSelectedBooks);
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  // When user initiates the exchange
  const onExchangeInitiate = () => {
    const exchangeData = {
      booksGiven: selectedBooks,
      bookwanted: currentBookId,
      bookOwner: currentBookOwner,
    };
    dispatch(createExchange(exchangeData));
  };

  let renderBooks = <Loading />;

  if (fetchMyExchangeBooksLoading) {
    renderBooks = <Loading />;
  } else if (isSuccess && myExchangeBooks) {
    renderBooks = (
      <Box>
        <Flex direction="column">
          {myExchangeBooks.map((book) => (
            <OfferItem
              key={book._id}
              book={book}
              onExchangeBookSelect={onExchangeBookSelect}
              selectedBooks={selectedBooks}
            />
          ))}
        </Flex>
        <Button
          disabled={selectedBooks.length === 0}
          onClick={onExchangeInitiate}
          loading={createExchangeLoading}
        >
          Done
        </Button>
      </Box>
    );
  }

  return (
    <Modal
      opened={props.opened}
      title={<Text weight={600}>Select books to offer</Text>}
      onClose={() => props.setOpened(false)}
      centered
    >
      {renderBooks}
    </Modal>
  );
};

export default MyBookOffers;
