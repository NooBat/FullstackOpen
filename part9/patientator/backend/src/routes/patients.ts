import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

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

export default router;
