import patientsData from '../../data/patients.json';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { v4 as uuid } from 'uuid';


const getPatients = (): PublicPatient[] => {
    const nonSensitivePatientData: PublicPatient[] = patientsData.map(data => {
        return {
            id: data.id,
            name: data.name,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            occupation: data.occupation
        } as PublicPatient;
    });

    return nonSensitivePatientData;
};

const getPatient = (id: string): Patient => {
    const patientData: Patient = patientsData.filter(data => data.id === id).map(data => {
        return {
            id: data.id,
            name: data.name,
            ssn: data.ssn,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            occupation: data.occupation,
            entries: []
        } as Patient;
    })[0];

    return patientData;
};

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