export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type PatientNonSensitiveData = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
