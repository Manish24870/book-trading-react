import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { IoSwapVerticalOutline } from "react-icons/io5";

import RoleChangeModal from "./RoleChangeModal";
import { errorNotification } from "../../../utils/notification/showNotification";

const roles = ["user", "admin"];

const UserRow = (props) => {
  const [opened, setOpened] = useState(false);
  const [roleValue, setRoleValue] = useState("");

  // useEffect(() => {
  //   setRoleValue(props.userItem.role);
  // }, [props.userItem]);

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
        // changeRoleHandler={changeRoleHandler}
        // changeUserRoleLoading={props.changeUserRoleLoading}
      />
    </tr>
  );
};

export default UserRow;
