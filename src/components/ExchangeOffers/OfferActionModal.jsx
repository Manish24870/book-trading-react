import { Modal, Text, Button, Textarea, Flex } from "@mantine/core";
import { IoCloseOutline, IoCheckmarkOutline } from "react-icons/io5";

const OfferActionModal = (props) => {
  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title="Accept / Reject offer"
      centered
    >
      <Textarea
        placeholder="Write feedback here"
        label="Your feedback"
        value={props.feedbackText}
        onChange={(event) => props.setFeedbackText(event.currentTarget.value)}
        mb={20}
      />
      <Flex justify="end" gap={20} sx={{ marginTop: "auto" }}>
        <Button
          leftIcon={<IoCheckmarkOutline size={20} />}
          mb={12}
          onClick={props.offerAcceptHandler}
        >
          Accept
        </Button>
        <Button
          color="red"
          leftIcon={<IoCloseOutline size={20} />}
          onClick={props.offerRejectHandler}
        >
          Reject
        </Button>
      </Flex>
    </Modal>
  );
};

export default OfferActionModal;
