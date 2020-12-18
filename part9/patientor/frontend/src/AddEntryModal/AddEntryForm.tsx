import React from "react";
import { Grid, Button, Form as SemanticForm } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import { HealthCheckRating } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { isDate } from "../utils";
import { EntryProps } from "../interfaces";


export const AddEntryForm: React.FC<EntryProps> = (props) => {
  const [{ diagnoses }] = useStateValue();
  const { onSubmit, onClose, patientId } = props;

  const entryOptions = [
    {
      key: "HospitalEntry",
      text: "Hospital",
      value: "Hospital",
    },
    {
      key: "OccupationalHealthcareEntry",
      text: "Occupational Healthcare",
      value: "OccupationalHealthcare",
    },
    {
      key: "HealthCheckEntry",
      text: "Health Check",
      value: "HealthCheck",
    },
  ];

  const ratingOptions = [
    { key: "Healthy", value: HealthCheckRating.Healthy, text: "Healthy" },
    { key: "LowRisk", value: HealthCheckRating.LowRisk, text: "Low Risk" },
    { key: "HighRisk", value: HealthCheckRating.HighRisk, text: "High Risk" },
    {
      key: "CriticalRisk",
      value: HealthCheckRating.CriticalRisk,
      text: "Critical Risk",
    },
  ];

  const showSelectedEntry = (type: string) => {
    switch (type) {
      case "Hospital":
        return (
          <>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Criteria"
              name="dischargeCriteria"
              component={TextField}
            />
          </>
        );

      case "HealthCheck":
        return (
          <SemanticForm.Field>
            <label>Rating</label>
            <Field as="select" name="healthCheckRating" className="ui dropdown">
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text || option.value}
                </option>
              ))}
            </Field>
          </SemanticForm.Field>
        );

      case "OccupationalHealthcare":
        return (
          <>
            <Field
              label="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStartDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEndDate"
              component={TextField}
            />
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <Formik
      initialValues={{
        id: patientId,
        description: "",
        specialist: "",
        type: "Hospital",
        date: "",
        diagnosisCodes: [],
        dischargeDate: "",
        dischargeCriteria: "",
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

        if (values.type === "Hospital") {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }

          if (values.dischargeDate && !isDate(values.dischargeDate)) {
            errors.dischargeDate = "Discharge date is invalid";
          }

          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          
          if (!values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          }

          if (values.sickLeaveStartDate && !isDate(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = 'Sick Leave start date is invalid';
          }

          if (!values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          }

          if (values.sickLeaveEndDate && !isDate(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = 'Sick Leave end date is invalid';
          }
        }

        return errors;
      }}
    >
      {({ dirty, isValid, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field type="hidden" name="id" />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            
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

            <SemanticForm.Field>
              <label>Entry Type</label>
              <Field as="select" name="type" className="ui dropdown">
                {entryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text || option.value}
                  </option>
                ))}
              </Field>
            </SemanticForm.Field>

            {showSelectedEntry(values.type)}

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
                  disabled={!dirty || !isValid}
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
