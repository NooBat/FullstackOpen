import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const getEntries = (): Patient[] => patients;

const getSecuredEntries = (): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const findByPatientId = (id: string): Patient | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  const patient = findByPatientId(id);
  const entry: Entry = {
    id: uuid(),
    ...newEntry,
  };

  if (!patient) {
    return undefined;
  }

  patient.entries = patient.entries.concat(entry);

  return patient;
};

export default {
  getEntries,
  getSecuredEntries,
  addPatient,
  findByPatientId,
  addEntry,
};
