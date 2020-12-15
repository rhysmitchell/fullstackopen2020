import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, Entry } from '../types';
import { Patient } from '../interfaces';
import { toPatient, toEntry } from '../utils';

const router = express.Router();

interface getPatientProps {
    id: string,
}

const getPatientById = (props: getPatientProps) => {
    const { id } = props;
    const patient: Patient | undefined = patientService.getPatient(id);

    return patient;
};

router.get('/', (_req, res) => res.send(patientService.getPatients()));

router.post('/', (req, res) => {
    try {

        const patientToAdd: NewPatient = toPatient(req.body);
        const newPatient = patientService.addPatient(patientToAdd);
        res.json(newPatient);
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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient: Patient | undefined = getPatientById({ id });

    if (!patient) {
        res.status(400).send(`Patient with the id of ${id} does not exist.`);
    }

    res.send(patient);
});

router.post('/:id/entries', (req, res) => {
    const { id } = req.params;

    try {
        const entry: Entry = toEntry(req.body);
        const addedEntry = patientService.addEntry(id, entry);

        res.json(addedEntry);
    } catch (error) {
        // Credit: https://joefallon.net/2018/09/typescript-try-catch-finally-and-custom-errors/
        let errorMessage = '';

        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else {
            errorMessage = `There was an error while adding a new entry to a patient`;
        }

        res.status(400).send(errorMessage);
    }

});


export default router;