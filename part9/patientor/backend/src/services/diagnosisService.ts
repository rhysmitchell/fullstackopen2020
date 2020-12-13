import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../interfaces';

const getDiagnoses = (): Diagnosis[] | null => diagnosisData;

export default {
    getDiagnoses
};