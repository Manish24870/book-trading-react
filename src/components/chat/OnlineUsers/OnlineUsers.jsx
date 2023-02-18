import { Text, Box, Avatar } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OnlineUser from "./OnlineUser";
import { fetchUsers } from "../../../features/chat/chatSlice";
import Loading from "../../common/Loading";
import { errorNotification } from "../../../utils/notification/showNotification";

const OnlineUsers = (props) => {
  const dispatch = useDispatch();
  const { allUsersLoading, fetchUserSuccess, isFetchUserError, fetchUserError, allUsers } =
    useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (isFetchUserError) {
      errorNotification({ title: "Error", message: fetchUserError });
    }
  }, [isFetchUserError, fetchUserError]);

  let renderUsers = <Loading />;

  if (allUsersLoading) {
    renderUsers = <Loading />;
  } else if (allUsers && fetchUserSuccess) {
    renderUsers = allUsers.map((user) => (
      <OnlineUser
        key={user._id}
        user={user}
        onlineUsers={props.onlineUsers}
        userInfo={props.userInfo}
      />
    ));
  }

  return <Box>{renderUsers}</Box>;
};

export default OnlineUsers;
