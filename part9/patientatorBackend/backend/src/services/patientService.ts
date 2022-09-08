import { v1 as uuid } from 'uuid';

import { NewPatientEntry, PatientEntry, SecuredPatientEntry } from '../types';
import patients from '../../data/patients';

const getEntries = (): PatientEntry[] => patients;

const getSecuredEntries = (): SecuredPatientEntry[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const findByPatientId = (id: string): PatientEntry | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

export default { getEntries, getSecuredEntries, addPatient, findByPatientId };
