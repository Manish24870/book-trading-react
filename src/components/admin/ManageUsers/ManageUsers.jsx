import { useEffect } from "react";
import { Card, Table, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../common/Loading";
import UserRow from "./UserRow";
import { getAllUsers } from "../../../features/user/userSlice";

const ManageUsers = (props) => {
  const dispatch = useDispatch();
  const { users, fetchUsersLoading, fetchUsersSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let renderUserItems = <Loading />;
  if (fetchUsersLoading) {
    renderUserItems = <Loading />;
  } else if (users && fetchUsersSuccess) {
    renderUserItems = (
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr style={{ textAlign: "centerd" }}>
            <th style={{ textAlign: "left" }}>User</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              // changeUserRoleLoading={props.changeUserRoleLoading}
            />
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10}>
      {renderUserItems}
    </Card>
  );
};

export default ManageUsers;
