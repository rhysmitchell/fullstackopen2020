import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { isDate } from "../utils";

export interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  modalOpen: boolean;
  onClose: () => void;
  patientId: string;
}

export const AddEntryForm: React.FC<EntryProps> = (props) => {
  const [{ diagnoses }] = useStateValue();
  const { onSubmit, onClose, patientId } = props;
  return (
    <Formik
      initialValues={{
        id: patientId,
        description: "",
        specialist: "",
        type: "OccupationalHealthcare",
        date: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!isDate(values.date)) {
          errors.date = "Date is invalid";
        }

        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.employerName) {
          errors.employerName = requiredError;
        }

        return errors;
      }}
    >
      {({ dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field type="hidden" name="id" />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onClose} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
