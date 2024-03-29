import { useState } from "react";
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Title,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Container,
  Anchor,
  ActionIcon,
  UnstyledButton,
  Avatar,
  MediaQuery,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import { useSelector } from "react-redux";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import { RiAuctionLine, RiChat1Line } from "react-icons/ri";

import UserMenu from "./UserMenu";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none !important",
    color: theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    borderRadius: 4,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colors.gray[1],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header py={10} px="md">
        <Container size="lg">
          <Group position="apart" sx={{ height: "100%" }}>
            <ActionIcon component={Link} to="/">
              <ImBooks size={26} color={theme.colors.primary[6]} style={{ cursor: "pointer" }} />
            </ActionIcon>

            <Group
              sx={{ height: "100%" }}
              spacing={26}
              className={classes.hiddenMobile}
              align="center"
            >
              {isAuthenticated ? (
                <>
                  <Anchor className={classes.link} component={Link} to="/sell" py={4}>
                    <FaRegMoneyBillAlt size={20} />
                    <Text ml={6}>Sell</Text>
                  </Anchor>
                  <Anchor className={classes.link} component={Link} to="/exchange" py={4}>
                    <CgArrowsExchange size={20} />
                    <Text ml={6}>Exchange</Text>
                  </Anchor>
                  <Anchor className={classes.link} component={Link} to="/auction" py={4}>
                    <RiAuctionLine size={20} />
                    <Text ml={6}>Auction</Text>
                  </Anchor>
                  <Anchor className={classes.link} component={Link} to="/chat" py={4}>
                    <RiChat1Line size={20} />
                    <Text ml={6}>Chat</Text>
                  </Anchor>
                </>
              ) : null}
            </Group>

            <Group className={classes.hiddenMobile}>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="default" component={Link} to="/login">
                    Log in
                  </Button>
                  <Button component={Link} to="/register">
                    Sign up
                  </Button>
                </>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <ActionIcon component={Link} to="/">
            <ImBooks size={26} color={theme.fn.primaryColor()} style={{ cursor: "pointer" }} />
          </ActionIcon>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider my="sm" color={"gray.1"} />
          {isAuthenticated ? (
            <>
              <Anchor className={classes.link} component={Link} to="/shop" py={4}>
                Shop
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/exchange" py={4}>
                Exchange
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/auction" py={4}>
                Auction
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/chat" py={4}>
                Chat
              </Anchor>
            </>
          ) : null}

          <Divider my="sm" color={"gray.1"} />

          <Group position="center" pb="xl" px="md">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="default" component={Link} to="/login">
                  Log in
                </Button>
                <Button component={Link} to="/register">
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
