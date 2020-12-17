import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { EntryFormValues } from "../types";
import AddEntryForm from "./AddEntryForm";

interface EntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  patientId: string;
}

export const AddEntryModal: React.FC<EntryProps> = props => {
  const { modalOpen, onSubmit, onClose, patientId, error } = props;

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm
          modalOpen={modalOpen}
          patientId={patientId}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
