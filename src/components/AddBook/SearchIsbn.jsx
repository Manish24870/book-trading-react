import { Modal, Button, Group, TextInput } from "@mantine/core";

const SearchIsbn = (props) => {
  return (
    <Modal
      centered
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title="Search ISBN "
    >
      <TextInput
        label="Enter ISBN"
        placeholder="Book ISBN number"
        value={props.searchIsbn}
        onChange={(e) => props.setSearchIsbn(e.target.value)}
      />
      <Button
        mt={20}
        onClick={() => props.searchIsbnBookHandler(props.searchIsbn)}
        disabled={props.searchIsbn.length === 0}
      >
        Search
      </Button>
    </Modal>
  );
};

export default SearchIsbn;
