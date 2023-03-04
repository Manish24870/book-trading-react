import { Card, Flex, Text, Badge, Box, useMantineTheme } from "@mantine/core";

const WalletTransactions = (props) => {
  const theme = useMantineTheme();
  let newStripeTransactions = props.stripeTransactions.map((el) => {
    return {
      transactionType: el.object === "checkout.session" ? "Wallet load" : "Wallet cashout",
      transactionAmount:
        el.object === "checkout.session"
          ? el.amount_total
          : el.object === "charge"
          ? el.amount
          : null,
      transactionDate: el.transactionDate,
      _id: el.id,
    };
  });

  let combinedTransactions = [...props.appTransactions, ...newStripeTransactions];
  combinedTransactions.sort((a, b) => b.transactionDate.localeCompare(a.transactionDate));

  return (
    <Box>
      <Card
        withBorder
        sx={{
          backgroundColor: theme.colors.gray[1],
        }}
        mb={20}
      >
        <Flex align="center" justify="space-between">
          <Text weight={600}>Transaction type</Text>
          <Text weight={600}>Date</Text>
          <Text weight={600}>Amount</Text>
        </Flex>
      </Card>
      {combinedTransactions.map((el) => (
        <Card withBorder shadow="lg" mb={14}>
          <Flex align="center" justify="space-between">
            <Text weight={500}>{el.transactionType}</Text>

            <Text color="dimmed">{new Date(el.transactionDate).toLocaleString()}</Text>
            <Badge
              radius="sm"
              size="xl"
              color={
                el.transactionType === "Wallet load" || el.transactionType === "Book sell"
                  ? "blue"
                  : "secondary"
              }
            >
              Rs. {el.transactionAmount}
            </Badge>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};

export default WalletTransactions;
