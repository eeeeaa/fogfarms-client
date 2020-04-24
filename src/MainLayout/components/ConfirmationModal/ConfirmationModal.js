import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ConfirmationModal = ({
  title = "Confirm",
  show,
  onHide,
  onConfirm,
  message = "Are you sure you want to continue ?",
  error,
  loading,
  closeText = "Close",
  confirmText = "Confirm",
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop={true}
      style={{
        color: "black",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          {closeText}
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={loading}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
