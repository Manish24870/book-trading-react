import { Modal, Button, Group, Select, Text } from "@mantine/core";

const availability = [
  {
    value: true,
    label: "Available",
  },
  {
    value: false,
    label: "Unavailable",
  },
];

const BookStatusModal = (props) => {
  return (
    <Modal
      centered
      title={<Text weight={600}>Change book availability</Text>}
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      <Select
        data={availability}
        placeholder="Change availability"
        label="Book availability"
        value={props.availabilityValue}
        onChange={props.setAvailabilityValue}
      />
      <Button
        fullWidth
        mt={20}
        onClick={props.changeAvailabilityHandler}
        loading={props.changeAvailabilityLoading}
      >
        Apply
      </Button>
    </Modal>
  );
};

export default BookStatusModal;
