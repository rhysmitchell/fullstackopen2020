import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Icon,
  Button,
  SemanticICONS,
  Form,
  List,
} from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Diagnosis } from "../types";
import { useStateValue, updatePatient, setDiagnosisList } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        setPatient(patientData);
        dispatch(updatePatient(patientData));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patients[id]?.ssn) {
      setPatient(patients[id]);
    } else {
      fetchPatient();
      fetchDiagnosisList();
    }
  }, [id, dispatch, patients]);

  const getgenderIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case "male":
        return "mars";

      case "female":
        return "venus";

      default:
        return "genderless";
    }
  };

  return (
    <div>
      <Button icon labelPosition="left" as={Link} to={"/"}>
        Back
        <Icon name="arrow left" />
      </Button>
      {patient && (
        <Card>
          <Card.Content>
            <Card.Header>{patient.name}</Card.Header>
            <Card.Meta>{patient.occupation}</Card.Meta>
            <Card.Content>
              <br />

              <Form>
                <Form.Field>
                  <label>Id</label>
                  {patient.id}
                </Form.Field>

                <Form.Field>
                  <label>Date of birth</label>
                  {patient.dateOfBirth}
                </Form.Field>

                <Form.Field>
                  <label>Gender</label>
                  <Icon name={getgenderIcon(patient.gender)} />
                </Form.Field>

                <Form.Field>
                  <label>SSN</label>
                  {patient.ssn}
                </Form.Field>

                <Form.Field>
                  <label>Entries</label>
                  <List>
                    {patient.entries.map((patient) => (
                      <List.Item key={patient.id}>
                        <Form.Field>
                          <label>Date</label>
                          {patient.date}
                        </Form.Field>

                        <Form.Field>
                          <label>Description</label>
                          {patient.description}
                        </Form.Field>

                        <Form.Field>
                          <label>Diagnoses</label>
                          <List>
                            {patient?.diagnosisCodes?.map((code) => (
                              <List.Item key={code}>
                                {code} {diagnoses[code]?.name}
                              </List.Item>
                            ))}
                          </List>
                        </Form.Field>
                      </List.Item>
                    ))}
                  </List>
                </Form.Field>
              </Form>
            </Card.Content>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default PatientPage;