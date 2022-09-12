import express from 'express';

import patientService from '../services/patientService';
import { parseEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getSecuredEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const patient = patientService.findByPatientId(id);

  if (!patient) {
    res.status(404).end();
  } else {
    res.send(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry = parseEntry(req.body);
    const patient = patientService.addEntry(req.params.id, entry);

    if (!patient) {
      res.status(404).end();
    } else {
      res.json(patient);
    }
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong.';
    if (e instanceof Error) {
      errorMessage = `${errorMessage} Error: ${e.message}`;
    }

    res.status(400).send({ error: errorMessage });
  }
});

export default router;
