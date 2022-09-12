/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BaseTypedEntry,
  NewEntry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
  NewBaseTypedEntry,
} from './types';

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isNumber = (number: unknown): number is number =>
  typeof number === 'number' || number instanceof Number;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (gender: string): gender is Gender => {
  const allGenders: string[] = Object.values(Gender);
  return allGenders.includes(gender);
};

const isHealthCheckRating = (
  healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
  const allHealthCheckRatings: (string | number)[] =
    Object.values(HealthCheckRating);
  return allHealthCheckRatings.includes(healthCheckRating);
};

const isEntry = (entry: any): NewBaseTypedEntry => {
  const { type, date, specialist, description, diagnosisCodes } = entry;

  if (!type || !isString(type)) {
    throw new Error(`incorrect or missing type: ${JSON.stringify(entry)}`);
  }
  if (!date || !isDate(date)) {
    throw new Error(`incorrect or missing date: ${JSON.stringify(entry)}`);
  }
  if (!specialist || !isString(specialist)) {
    throw new Error(
      `incorrect or missing specialist: ${JSON.stringify(entry)}`
    );
  }
  if (!description || !isString(description)) {
    throw new Error(
      `incorrect or missing description: ${JSON.stringify(entry)}`
    );
  }
  if (diagnosisCodes) {
    if (!Array.isArray(diagnosisCodes)) {
      throw new Error(`incorrect diagnosisCodes: ${JSON.stringify(entry)}`);
    }

    diagnosisCodes.forEach((code) => {
      if (!isString(code)) {
        throw new Error(`incorrect code: ${JSON.stringify(code)}`);
      }
    });
  }

  return entry;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  const { healthCheckRating } = entry;

  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(`incorrect entry format: ${JSON.stringify(entry)}`);
  }

  return true;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  const { discharge } = entry;

  if (!discharge) {
    return true;
  }

  const { date, criteria } = discharge;

  if (!date || !isDate(date)) {
    throw new Error(`incorrect or missing date: ${JSON.stringify(entry)}`);
  }
  if (!criteria || !isString(criteria)) {
    throw new Error(`incorrect or missing criteria: ${JSON.stringify(entry)}`);
  }

  return true;
};

const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  const { employerName, sickLeave } = entry;

  if (!employerName || !isString(employerName)) {
    throw new Error(
      `incorrect or missing employer name: ${JSON.stringify(entry)}`
    );
  }

  if (!sickLeave) {
    return true;
  }

  const { startDate, endDate } = sickLeave;

  if (!startDate || !isDate(startDate)) {
    throw new Error(`incorrect or missing startDate: ${JSON.stringify(entry)}`);
  }
  if (!endDate || !isDate(endDate)) {
    throw new Error(`incorrect or missing endDate: ${JSON.stringify(entry)}`);
  }

  return true;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`incorrect or missing name: ${name}`);
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`incorrect or missing dateOfBirth: ${date}`);
  }

  return date;
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

export const parseEntry = (entry: unknown): NewEntry => {
  if (!isEntry(entry)) {
    throw new Error(`incorrect entry format: ${JSON.stringify(entry)}`);
  }

  switch ((entry as BaseTypedEntry).type) {
    case 'HealthCheck':
      if (!isHealthCheckEntry(entry)) {
        throw new Error(`incorrect entry: ${JSON.stringify(entry)}`);
      }
      break;
    case 'Hospital':
      if (!isHospitalEntry(entry)) {
        throw new Error(`incorrect entry: ${JSON.stringify(entry)}`);
      }
      break;
    case 'OccupationalHealthcare':
      if (!isOccupationalHealthcareEntry(entry)) {
        throw new Error(`incorrect entry: ${JSON.stringify(entry)}`);
      }
      break;
    default:
      throw new Error(
        `Unhandled discriminated union type: ${JSON.stringify(entry)}`
      );
  }

  return entry;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatient | never => {
  const newPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newPatientEntry;
};
