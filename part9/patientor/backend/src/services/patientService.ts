import patientsData from '../../data/patients';
import { PublicPatient, NewPatient, Entry } from '../types';
import { Patient } from '../interfaces';
import { v4 as uuid } from 'uuid';

const patients: Patient[] | null = patientsData;

const getPatients = (): PublicPatient[] => patients.map(patient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  const publicPatient: PublicPatient = { id, name, dateOfBirth, gender, occupation };
  return publicPatient;
});

const getPatient = (id: string): Patient | undefined => patients.find(patient => patient.id === id);

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  } as Patient;

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {

  const patient: Patient | undefined = getPatient(patientId);
  if (!patient) {
    throw new Error(`Patient with the id ${patientId} does not exist.`);
  }

  patient.entries.concat(entry);

  return entry;
};

export default {
  getPatients,
  getPatient,
  addEntry,
  addPatient,
};