import { Box, Title, TextInput, Group, Flex, Checkbox, Text, Button } from "@mantine/core";

const ShippingDetails = (props) => {
  const form = props.form;

  return (
    <Box>
      <Box>
        <Title order={5} mb={8}>
          Personal Information
        </Title>
        <Flex direction="column" grow>
          <TextInput
            label="Email"
            placeholder="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
          />
          <TextInput
            label="Fullname"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
            error={form.errors.name}
          />
        </Flex>
      </Box>
      <Box mt={30}>
        <Title order={5} mb={8}>
          Shipping Address
        </Title>
        <Flex direction="column" grow>
          <TextInput
            label="Address"
            placeholder="Your address"
            value={form.values.address}
            onChange={(event) => form.setFieldValue("address", event.currentTarget.value)}
            error={form.errors.address}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            value={form.values.city}
            onChange={(event) => form.setFieldValue("city", event.currentTarget.value)}
            error={form.errors.city}
          />
          <TextInput
            placeholder="Your phone number"
            label="Phone Number"
            value={form.values.phoneNumber}
            onChange={(event) => form.setFieldValue("phoneNumber", event.currentTarget.value)}
            error={form.errors.phoneNumber}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default ShippingDetails;
