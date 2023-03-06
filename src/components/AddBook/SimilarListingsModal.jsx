import { Card, Box, Modal } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../common/Loading";
import { fetchSimilarListings } from "../../features/book/booksSlice";
import SimilarListingItem from "./SimilarListingItem";

const SimilarListingsModal = (props) => {
  const dispatch = useDispatch();
  const { similarBookListings, similarBookListingsLoading } = useSelector((state) => state.books);

  useEffect(() => {
    if (props.isbn?.length > 0) {
      dispatch(fetchSimilarListings(props.isbn));
    }
  }, [props.isbn]);
  let renderSimilarListings = <Loading />;

  if (similarBookListingsLoading) {
    renderSimilarListings = <Loading />;
  } else if (props.isbn && similarBookListings && !similarBookListingsLoading) {
    renderSimilarListings = similarBookListings.map((listing) => (
      <SimilarListingItem key={listing._id} listing={listing} />
    ));
  }

  return (
    <Modal
      centered
      size="lg"
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title="Similar listings"
    >
      {renderSimilarListings}
    </Modal>
  );
};

export default SimilarListingsModal;
