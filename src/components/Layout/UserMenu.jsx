import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Text,
  UnstyledButton,
  Group,
  Avatar,
  Menu,
  Badge,
  Container,
  createStyles,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import {
  IoLogOutOutline,
  IoHourglassOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { BsChevronDown, BsCartCheck } from "react-icons/bs";
import { MdOutlineLocalOffer, MdBookmarkAdd, MdOutlineAdminPanelSettings } from "react-icons/md";

import { logoutUser } from "../../features/user/userSlice";
import { removeMyProfile } from "../../features/profile/profileSlice";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 200ms ease",

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

const UserMenu = (props) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { myProfile } = useSelector((state) => state.profile);
  const { classes, theme, cx } = useStyles();
  const dispatch = useDispatch();

  const logoutUserHandler = () => {
    dispatch(logoutUser());
    dispatch(removeMyProfile());
  };

  return (
    <Container className={classes.mainSection}>
      <Menu
        width={200}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
            <Group spacing={7}>
              <Avatar
                src={process.env.REACT_APP_BASE_IMAGE_URL + myProfile?.photo}
                alt={myProfile?.name}
                radius="xl"
                size={26}
              />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mx={3}>
                {myProfile?.name}
              </Text>
              <BsChevronDown size={12} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Badge radius="sm" sx={{ width: "100%" }}>
            {myProfile?.role}
          </Badge>
          <Menu.Label>Account</Menu.Label>

          <Menu.Item component={Link} to="/my-profile" icon={<IoSettingsOutline size={18} />}>
            Profile
          </Menu.Item>
          <Menu.Item
            component={Link}
            to="/exchange/offers"
            icon={<MdOutlineLocalOffer size={18} />}
          >
            Offers
          </Menu.Item>
          <Menu.Item
            component={Link}
            to="/exchange/initiates"
            icon={<IoHourglassOutline size={18} />}
          >
            Initiates
          </Menu.Item>
          <Menu.Item component={Link} to="/cart" icon={<BsCartCheck size={18} />}>
            Cart
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Actions</Menu.Label>
          <Menu.Item component={Link} to="/books/add" icon={<MdBookmarkAdd size={18} />}>
            Add Book
          </Menu.Item>
          {myProfile?.role === "admin" && (
            <Menu.Item
              component={Link}
              to="/admin"
              icon={<MdOutlineAdminPanelSettings size={18} />}
            >
              Admin Panel
            </Menu.Item>
          )}
          <Menu.Item onClick={logoutUserHandler} color="red" icon={<IoLogOutOutline size={18} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Container>
  );
};

export default UserMenu;
