import patientsData from '../../data/patients';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] | null = patientsData;

const getPatients = (): PublicPatient[] => patients.map(patient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  const publicPatient: PublicPatient = { id, name, dateOfBirth, gender, occupation };
  return publicPatient;
});

const getPatient = (id: string): Patient | undefined => patients.find(patient => patient.id === id);

const addEntry = (entry: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const guid: string = uuid();

  const newPatientEntry: Patient = {
    id: guid,
    ...entry,
    entries: []
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatient,
  addEntry
};