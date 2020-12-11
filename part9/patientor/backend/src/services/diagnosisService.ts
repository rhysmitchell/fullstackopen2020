import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] | null => diagnosisData;

export default {
    getDiagnoses
};