import { Box, Title, TextInput, Group, Flex, Checkbox, Text, Button } from "@mantine/core";

const ShippingDetails = (props) => {
  const form = props.form;

  return (
    <Box>
      <Box>
        <Title order={5} mb={8}>
          Personal Information
        </Title>
        <Flex direction="column">
          <TextInput
            label="Email"
            placeholder="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
            mb={10}
          />
          <TextInput
            label="Fullname"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
            error={form.errors.name}
            mb={10}
          />
        </Flex>
      </Box>
      <Box mt={30}>
        <Title order={5} mb={8}>
          Shipping Address
        </Title>
        <Flex direction="column">
          <TextInput
            label="Address"
            placeholder="Your address"
            value={form.values.address}
            onChange={(event) => form.setFieldValue("address", event.currentTarget.value)}
            error={form.errors.address}
            mb={10}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            value={form.values.city}
            onChange={(event) => form.setFieldValue("city", event.currentTarget.value)}
            error={form.errors.city}
            mb={10}
          />
          <TextInput
            placeholder="Your phone number"
            label="Phone Number"
            value={form.values.phoneNumber}
            onChange={(event) => form.setFieldValue("phoneNumber", event.currentTarget.value)}
            error={form.errors.phoneNumber}
            mb={10}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default ShippingDetails;
