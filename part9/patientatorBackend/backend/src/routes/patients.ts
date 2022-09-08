import express from 'express';

import patientService from '../services/patientService';

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
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;
