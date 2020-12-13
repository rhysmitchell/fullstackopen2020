import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Icon, Button, SemanticICONS, Item } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Gender } from "../types";
import { Patient, Diagnosis } from "../interfaces";
import { useStateValue, updatePatient, setDiagnosisList } from "../state";
import EntryDetails from "../components/EntryDetails";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
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
            <Card.Header>
              {patient.name} <Icon name={getgenderIcon(patient.gender)} />
            </Card.Header>
            <Card.Meta>Occupation: {patient.occupation}</Card.Meta>
            <Card.Meta>SSN: {patient.ssn}</Card.Meta>
            <Card.Content>
              <Card.Header>
                <h4 style={{ paddingTop: "15px" }}>Entries</h4>
              </Card.Header>
              <Item.Group style={{ margin: 0 }}>
                {patient.entries.map((entry) => (
                  <EntryDetails key={entry.id} entry={entry} />
                ))}
              </Item.Group>
            </Card.Content>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default PatientPage;
