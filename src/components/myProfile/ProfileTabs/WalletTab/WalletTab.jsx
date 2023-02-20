import { useState, useEffect } from "react";
import { Box, Card, Title, Text, Flex, Button, Group, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { IoCardOutline } from "react-icons/io5";
import { BiCapsule } from "react-icons/bi";

import LoadWalletModal from "./LoadWalletModal";
import CashoutWalletModal from "./CashoutWalletModal";
import Loading from "../../../common/Loading";
import { setupStripeAccount } from "../../../../features/stripe/stripeSlice";
import { getWallet } from "../../../../features/wallet/walletSlice";
import { errorNotification } from "../../../../utils/notification/showNotification";
import isEmpty from "../../../../utils/isEmpty";

const WalletTab = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [cashoutOpened, setCashoutOpened] = useState(false);

  const { wallet, isSuccess, isError, error, loadWalletLoading } = useSelector(
    (state) => state.wallet
  );

  const stripeIsError = useSelector((state) => state.stripe.isError);
  const stripeIsSuccess = useSelector((state) => state.stripe.isSuccess);
  const setupStripeAccountLoading = useSelector((state) => state.stripe.setupStripeAccountLoading);
  const stripeLink = useSelector((state) => state.stripe.stripeLink);

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  useEffect(() => {
    if (isError || stripeIsError) {
      errorNotification({ title: "Wallet error", message: error });
    }

    if (stripeIsSuccess && !isEmpty(stripeLink)) {
      window.open(stripeLink, "_blank");
    }
  }, [dispatch, isSuccess, isError, wallet, stripeIsError, stripeIsSuccess, stripeLink]);

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
        <CashoutWalletModal
          opened={cashoutOpened}
          setOpened={setCashoutOpened}
          loadWalletLoading={loadWalletLoading}
        />
        <Group position="apart">
          <Box>
            <Title mb={8}>Rs. {Math.floor(wallet.amount)}</Title>
            <Text color="dimmed">Current wallet balance</Text>
          </Box>
          {wallet.stripeOnboarded ? (
            <Flex direction="column" gap={12}>
              <Button
                variant="outline"
                leftIcon={<IoCardOutline size={20} />}
                loading={loadWalletLoading}
                onClick={() => setOpened(true)}
              >
                Load Wallet
              </Button>
              <Button
                variant="outline"
                color="secondary"
                leftIcon={<IoCardOutline size={20} />}
                loading={loadWalletLoading}
                onClick={() => setCashoutOpened(true)}
              >
                Cashout
              </Button>
            </Flex>
          ) : (
            <Button
              variant="outline"
              leftIcon={<BiCapsule size={20} />}
              loading={setupStripeAccountLoading}
              onClick={() => dispatch(setupStripeAccount())}
            >
              Setup Wallet
            </Button>
          )}
        </Group>
      </Card>
    );
  }

  return <Box mt={16}>{renderWallet}</Box>;
};

export default WalletTab;
