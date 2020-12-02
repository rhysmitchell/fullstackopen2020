import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => diagnosisData as Diagnosis[];

export default {
    getDiagnoses
};