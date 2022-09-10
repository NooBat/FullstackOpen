"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => typeof text === 'string' || text instanceof String;
const isDate = (date) => Boolean(Date.parse(date));
const isGender = (gender) => {
    const allGenders = Object.values(types_1.Gender);
    return allGenders.includes(gender);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`incorrect or missing name: ${name}`);
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error(`incorrect or missing dateOfBirth: ${dateOfBirth}`);
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, }) => {
    const newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return newPatientEntry;
};
exports.default = toNewPatientEntry;
