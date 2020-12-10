import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry, Patient } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => res.send(patientService.getPatients()));
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient: Patient | undefined = patientService.getPatient(id);

    if (!patient) {
        res.status(400).send(`Patient with the id of ${id} does not exist.`);
    }

    res.send(patient);
});

router.post('/', (req, res) => {
    try {

        const patientToAdd: NewPatientEntry = toNewPatientEntry(req.body);
        const newDiaryEntry = patientService.addEntry(patientToAdd);
        res.json(newDiaryEntry);
    }
    catch (error) {
        // Credit: https://joefallon.net/2018/09/typescript-try-catch-finally-and-custom-errors/
        let errorMessage = '';

        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else {
            errorMessage = `There was an error while adding a new patient entry`;
        }

        res.status(400).send(errorMessage);
    }
});

export default router;