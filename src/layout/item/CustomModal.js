import React from "react";
import { Button, Modal } from "semantic-ui-react";

const CustomModal = ({ open, setOpen, deleteProcess, id }) => {
  return (
    <Modal
      size="mini"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>Delete Your Account</Modal.Header>
      <Modal.Content>
        <p>Bạn có muốn xóa nhà cung cấp mã {id}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Hủy</Button>
        <Button
          onClick={() => {
            setOpen(false);
            deleteProcess();
          }}
          primary
        >
          Đồng ý
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CustomModal;
