import { useEffect } from "react";
import { Box, Text, Container, Flex } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../common/Loading";
import InitiateList from "./InitiateList";
import { getMyInitiates } from "../../features/exchange/exchangeSlice";
import { errorNotification } from "../../utils/notification/showNotification";

const ExchangeInitiates = (props) => {
  const dispatch = useDispatch();
  const { myInitiates, myInitiatesLoading, isMyInitiatesError, isMyInitiatesSuccess } = useSelector(
    (state) => state.exchange
  );

  useEffect(() => {
    dispatch(getMyInitiates());
  }, []);

  useEffect(() => {
    if (isMyInitiatesError) {
      errorNotification({ title: "Error", message: "Error fetching initiated exchanges" });
    }
  }, [isMyInitiatesError]);

  let renderInitiates = <Loading />;

  if (myInitiatesLoading) {
    renderInitiates = <Loading />;
  } else if (myInitiates && isMyInitiatesSuccess) {
    renderInitiates = <InitiateList myInitiates={myInitiates} />;
  }

  return (
    <Box mt={16}>
      <Container size="lg">{renderInitiates}</Container>
    </Box>
  );
};

export default ExchangeInitiates;
