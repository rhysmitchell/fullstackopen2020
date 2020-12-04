import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => res.send(patientService.getPatients()));

router.post('/', (req, res) => {
    try {

        const patientToAdd: NewPatientEntry = toNewPatientEntry(req.body);
        const newDiaryEntry = patientService.addEntry(patientToAdd);
        res.json(newDiaryEntry);
    }
    catch {
        // How do I get exception details here?...
        res.status(400).send(`There was an error while adding a new patient entry`);
    }
});

export default router;