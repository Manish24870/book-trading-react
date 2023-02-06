import { useEffect } from "react";
import { Box, Container } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";

import { getMyOffers } from "../../features/exchange/exchangeSlice";
import { errorNotification } from "../../utils/notification/showNotification";

import Loading from "../common/Loading";
import OfferList from "./OfferList";

const ExchangeOffers = (props) => {
  const dispatch = useDispatch();

  const { isError, error, isSuccess, myOffersLoading, myOffers } = useSelector(
    (state) => state.exchange
  );

  useEffect(() => {
    dispatch(getMyOffers());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Offer error", message: error });
    }
  }, [dispatch, isError, myOffers]);

  let renderOffers = <Loading />;

  if (myOffersLoading) {
    renderOffers = <Loading />;
  } else if (isSuccess && myOffers) {
    renderOffers = <OfferList myOffers={myOffers} />;
  }

  return (
    <Box mt={20}>
      <Container size="lg">{renderOffers}</Container>
    </Box>
  );
};

export default ExchangeOffers;
