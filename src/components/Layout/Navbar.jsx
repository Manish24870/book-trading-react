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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";

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
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header py={13} px="md">
        <Container size="lg">
          <Group position="apart" sx={{ height: "100%" }}>
            <ActionIcon component={Link} to="/">
              <ImBooks size={26} color={theme.fn.primaryColor()} style={{ cursor: "pointer" }} />
            </ActionIcon>

            <Group
              sx={{ height: "100%" }}
              spacing={26}
              className={classes.hiddenMobile}
              align="center"
            >
              <Anchor className={classes.link} component={Link} to="/sell" py={4}>
                Sell
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/exchange" py={4}>
                Exchange
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/auction" py={4}>
                Auction
              </Anchor>
            </Group>

            <Group className={classes.hiddenMobile}>
              <Button variant="default" component={Link} to="/login">
                Log in
              </Button>
              <Button component={Link} to="/register">
                Sign up
              </Button>
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

          <Anchor className={classes.link} component={Link} to="/shop" py={4}>
            Shop
          </Anchor>
          <Anchor className={classes.link} component={Link} to="/exchange" py={4}>
            Exchange
          </Anchor>
          <Anchor className={classes.link} component={Link} to="/auction" py={4}>
            Auction
          </Anchor>

          <Divider my="sm" color={"gray.1"} />

          <Group position="center" pb="xl" px="md">
            <Button variant="default" component={Link} to="/login">
              Log in
            </Button>
            <Button component={Link} to="/register">
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
