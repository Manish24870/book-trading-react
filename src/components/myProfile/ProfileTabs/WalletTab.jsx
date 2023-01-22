import { useState, useEffect } from "react";
import { Box, Card, Title, Text, Button, Group, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { IoCardOutline } from "react-icons/io5";

import LoadWalletModal from "./LoadWalletModal";
import Loading from "../../common/Loading";
import { getWallet } from "../../../features/wallet/walletSlice";
import { errorNotification } from "../../../utils/notification/showNotification";

const WalletTab = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const { wallet, isSuccess, isError, error, loadWalletLoading } = useSelector(
    (state) => state.wallet
  );

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Wallet error", message: error });
    }
  }, [dispatch, isSuccess, isError, wallet]);

  let renderWallet = <Loading />;

  if (loadWalletLoading) {
    renderWallet = <Loading />;
  } else if (isSuccess && wallet && !loadWalletLoading) {
    renderWallet = (
      <Card
        withBorder
        color="secondary"
        shadow="sm"
        sx={{
          backgroundColor: theme.colors.gray[2],
        }}
      >
        <LoadWalletModal
          opened={opened}
          setOpened={setOpened}
          loadWalletLoading={loadWalletLoading}
        />
        <Group position="apart">
          <Box>
            <Title mb={8}>Rs. {wallet.amount}</Title>
            <Text color="dimmed">Current wallet balance</Text>
          </Box>
          <Button
            variant="outline"
            leftIcon={<IoCardOutline size={20} />}
            loading={loadWalletLoading}
            onClick={() => setOpened(true)}
          >
            Load Wallet
          </Button>
        </Group>
      </Card>
    );
  }

  return <Box mt={16}>{renderWallet}</Box>;
};

export default WalletTab;
