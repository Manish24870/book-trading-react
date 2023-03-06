import { useEffect } from "react";
import { Box, Container, Text } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../common/Loading";
import OrderItem from "./OrderItem";
import { getMyOrders } from "../../features/user/userSlice";

const Orders = (props) => {
  const dispatch = useDispatch();
  const { myOrders, myOrdersLoading, isSuccess, isError, error, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  let renderOrders = <Loading />;

  if (myOrdersLoading) {
    renderOrders = <Loading />;
  } else if (myOrders && isSuccess) {
    renderOrders = myOrders.map((order) => (
      <OrderItem key={order._id} order={order} currentUser={user} />
    ));
  }

  return (
    <Box mt={20}>
      <Container size="lg">
        <Text weight={600} size="lg" mb={16}>
          My Orders
        </Text>
        {renderOrders}
      </Container>
    </Box>
  );
};

export default Orders;
