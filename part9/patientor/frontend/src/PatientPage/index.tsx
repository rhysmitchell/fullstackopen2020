import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Icon, Button, SemanticICONS, Item } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Gender } from "../types";
import { Patient, Diagnosis, EntryFormValues } from "../interfaces";
import {
  useStateValue,
  updatePatient,
  setDiagnosisList,
  addEntry,
} from "../state";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${values.id}/entries`,
        values
      );
      dispatch(addEntry(values.id, newEntry));
      setModalOpen(false);
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <Button color="green" onClick={() => setModalOpen(true)}>
        <Icon name="add" />
        Add New Entry
      </Button>
      <br />
      <br />

      <Button icon labelPosition="left" as={Link} to={"/"}>
        Back
        <Icon name="arrow left" />
      </Button>

      {patient && (
        <>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            onClose={() => setModalOpen(false)}
            patientId={patient.id}
            error={error}
          />

          <Card>
            <Card.Content>
              <Card.Header>
                {patient.name} <Icon name={getgenderIcon(patient.gender)} />
              </Card.Header>
              <Card.Meta>Occupation: {patient.occupation}</Card.Meta>
              <Card.Meta>SSN: {patient.ssn}</Card.Meta>
              <Card.Content>
                <Item.Group style={{ margin: 0 }}>
                  <Item>
                    <Item.Content>
                      <Item.Description>
                        <strong>Id: </strong>
                        {patient.id}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>

                <Item.Group style={{ margin: 0 }}>
                  <Item>
                    <Item.Content>
                      <Item.Description>
                        <strong>DOB: </strong>
                        {patient.dateOfBirth}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>

                <Card.Header>
                  <h4 style={{ paddingTop: "15px" }}>Entries</h4>
                </Card.Header>

                <Item.Group style={{ margin: 0 }}>
                  <ul>
                    {patient.entries.map((entry) => (
                      <li key={entry.id}>
                        <EntryDetails key={entry.id} entry={entry} />
                        <br/>
                      </li>
                    ))}
                  </ul>
                </Item.Group>
              </Card.Content>
            </Card.Content>
          </Card>
        </>
      )}
    </div>
  );
};

export default PatientPage;
