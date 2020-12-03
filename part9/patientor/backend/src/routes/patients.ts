import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => res.send(patientService.getPatients()));

router.post('/', (req, res) => {
    const patientToAdd = req.body as NewPatientEntry;
    const newDiaryEntry = patientService.addEntry(patientToAdd);
    res.json(newDiaryEntry);
});

export default router;