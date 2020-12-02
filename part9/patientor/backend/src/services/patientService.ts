import patientsData from '../../data/patients.json';
import { PatientNonSensitiveData } from '../types';

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

export default {
    getPatients
};