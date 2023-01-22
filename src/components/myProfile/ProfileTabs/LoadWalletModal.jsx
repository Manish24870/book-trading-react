import { useEffect } from "react";
import { Box, Title, Text, Card, Button, Modal, Group, Textarea, NumberInput } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { loadWallet } from "../../../features/wallet/walletSlice";
import { errorNotification } from "../../../utils/notification/showNotification";
import isEmpty from "../../../utils/isEmpty";

const schema = Joi.object({
  amount: Joi.number().required().messages({
    "number.empty": "Amount is required",
  }),
});

const LoadWalletModal = (props) => {
  const dispatch = useDispatch();

  const { wallet, isSuccess, isError, loadWalletSessionUrl, error, loadWalletLoading } =
    useSelector((state) => state.wallet);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Wallet error", message: error });
    }

    if (isSuccess && !isEmpty(loadWalletSessionUrl)) {
      window.open(loadWalletSessionUrl, "_blank");
    }
  }, [dispatch, isError, isSuccess, loadWalletSessionUrl, wallet]);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      amount: 0,
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(
        loadWallet({
          amount: form.values.amount,
        })
      );
    }
  };
  return (
    <Modal
      opened={props.opened}
      title={<Text weight={600}>Enter amount to load</Text>}
      onClose={() => props.setOpened(false)}
      centered
    >
      <Box>
        <form onSubmit={formSubmitHandler}>
          <Group>
            <NumberInput label="Amount" min={1} {...form.getInputProps("amount")} />
          </Group>
          <Button type="submit" loading={props.loadWalletLoading} mt={20}>
            Load
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoadWalletModal;
