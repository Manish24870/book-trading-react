import { useEffect } from "react";
import { Box, Title, Text, Card, Button, Modal, Group, Textarea, NumberInput } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { cashoutWallet } from "../../../../features/wallet/walletSlice";
import {
  errorNotification,
  successNotification,
} from "../../../../utils/notification/showNotification";
import isEmpty from "../../../../utils/isEmpty";
import { useNavigate } from "react-router-dom";

const schema = Joi.object({
  amount: Joi.number().required().messages({
    "number.empty": "Amount is required",
  }),
});

const CashoutWalletModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wallet, cashoutWalletSuccess, isError, cashoutWalletLoading, error } = useSelector(
    (state) => state.wallet
  );

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      amount: 0,
    },
  });

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Wallet error", message: error });
    }

    if (cashoutWalletSuccess && form.values.amount > 0) {
      successNotification({
        title: "Cashout success",
        message: `Cashed out Rs. ${form.values.amount} from the wallet`,
      });
      props.setOpened(false);
    }
  }, [dispatch, isError, cashoutWalletSuccess, wallet]);

  // When user submits the cashout form
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(
        cashoutWallet({
          amount: form.values.amount,
        })
      );
    }
  };

  return (
    <Modal
      opened={props.opened}
      title={<Text weight={600}>Enter amount to cashout</Text>}
      onClose={() => props.setOpened(false)}
      centered
    >
      <Box>
        <form onSubmit={formSubmitHandler}>
          <Group>
            <NumberInput label="Amount" min={1} {...form.getInputProps("amount")} />
          </Group>
          <Button type="submit" loading={cashoutWalletLoading} mt={20}>
            Cashout
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CashoutWalletModal;
