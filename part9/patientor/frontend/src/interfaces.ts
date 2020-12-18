import { Entry, Gender, HealthCheckRating } from "./types";

export interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  modalOpen: boolean;
  onClose: () => void;
  patientId: string;
  error?: string;
}
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  dischargeDate: string;
  dischargeCriteria: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface EntryFormValues extends BaseEntry {
  type: string;
  healthCheckRating?: HealthCheckRating;
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
}