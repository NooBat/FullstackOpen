import { Entry, Gender, NewPatient } from './types';

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (gender: string): gender is Gender => {
  const allGenders: string[] = Object.values(Gender);
  return allGenders.includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`incorrect or missing name: ${name}`);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`incorrect or missing dateOfBirth: ${dateOfBirth}`);
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: Entry[];
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries,
  };

  return newPatientEntry;
};

export default toNewPatientEntry;
