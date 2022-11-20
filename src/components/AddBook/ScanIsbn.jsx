import { Modal, Button, Group, TextInput } from "@mantine/core";

import QrCodeScanner from "./QrCodeScanner";

const ScanIsbn = (props) => {
  return (
    <Modal centered opened={props.opened} onClose={() => props.setOpened(false)} title="Scan ISBN">
      <p>Hello</p>
      <QrCodeScanner
        fps={10}
        qrbox={300}
        disableFlip={false}
        qrCodeSuccessCallback={props.qrCodeScanSuccessHandler}
      />
    </Modal>
  );
};

export default ScanIsbn;
