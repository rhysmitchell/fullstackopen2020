import patientsData from '../../data/patients.json';
import { PatientNonSensitiveData, NewPatientEntry, Patient } from '../types';
import { v4 as uuid } from 'uuid';


const getPatients = (): PatientNonSensitiveData[] => {
    const nonSensitivePatientData: PatientNonSensitiveData[] = patientsData.map(data => {
        return {
            id: data.id,
            name: data.name,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            occupation: data.occupation
        } as PatientNonSensitiveData;
    });

    return nonSensitivePatientData;
};

const addEntry = (entry: NewPatientEntry): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const guid: string = uuid() as string;

    const newPatientEntry: Patient = {
        id: guid,
        ...entry
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addEntry
};