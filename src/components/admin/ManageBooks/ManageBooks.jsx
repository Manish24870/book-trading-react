import { useEffect } from "react";
import { Card, Table, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../common/Loading";
import BookRow from "./BookRow";
import { fetchBooksAdmin } from "../../../features/book/booksSlice";

const ManageBooks = (props) => {
  const dispatch = useDispatch();
  const { adminBooks, isSuccess, adminBooksLoading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooksAdmin());
  }, []);

  let renderBookItems = <Loading />;

  if (adminBooksLoading) {
    renderBookItems = <Loading />;
  } else if (adminBooks && isSuccess) {
    renderBookItems = (
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr style={{ textAlign: "centerd" }}>
            <th style={{ textAlign: "left" }}>Book</th>
            <th style={{ textAlign: "center" }}>Category</th>
            <th style={{ textAlign: "center" }}>Owner</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminBooks.map((book) => (
            <BookRow key={book._id} book={book} />
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10}>
      {renderBookItems}
    </Card>
  );
};

export default ManageBooks;
