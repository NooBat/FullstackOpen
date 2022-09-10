export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
