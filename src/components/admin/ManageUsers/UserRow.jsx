import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import RoleChangeModal from "./RoleChangeModal";
import { errorNotification } from "../../../utils/notification/showNotification";
import { changeUserRole } from "../../../features/user/userSlice";

const roles = ["user", "admin"];

const UserRow = (props) => {
  const [opened, setOpened] = useState(false);
  const [roleValue, setRoleValue] = useState("");
  const dispatch = useDispatch();
  const { changeRoleLoading, changeRoleSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    setRoleValue(props.user.role);
  }, [props.user]);

  const changeRoleHandler = () => {
    dispatch(
      changeUserRole({
        userId: props.user._id,
        newRole: roleValue,
      })
    );
  };

  useEffect(() => {
    if (changeRoleSuccess) {
      setOpened(false);
    }
  }, [changeRoleSuccess]);

  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        <Group>
          <Avatar
            component={Link}
            to={`/profile/${props.user.username}`}
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.user.photo}
          />
          <Text component={Link} to={`/profile/${props.user.username}`}>
            {props.user.name}
          </Text>
        </Group>
      </td>
      <td>
        <Text>{props.user.username}</Text>
      </td>
      <td>
        <Badge radius="sm">{props.user.role}</Badge>
      </td>
      <td>
        <Text>{props.user.email}</Text>
      </td>
      <td>
        <Group position="right">
          <ActionIcon color="primary" variant="light" onClick={() => setOpened(true)}>
            <IoSwapVerticalOutline size={16} />
          </ActionIcon>
        </Group>
      </td>
      <RoleChangeModal
        opened={opened}
        setOpened={setOpened}
        roleValue={roleValue}
        setRoleValue={setRoleValue}
        changeRoleLoading={changeRoleLoading}
        changeRoleHandler={changeRoleHandler}
      />
    </tr>
  );
};

export default UserRow;
