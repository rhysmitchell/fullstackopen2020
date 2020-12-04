/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry } from './types';


// parseString
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (name: string, string: any): string => {
    if (!string || !isString(string)) {
        throw new Error(`Incorrect or missing string 'name': ${name}`);
    }

    return string;
};

// parseDate
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }

    const dateObject: Date = new Date(Date.parse(date));
    const dateAsString = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;

    return dateAsString;
};

// parseGender
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}}`);
    }
    return gender;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseString('name', object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString('ssn', object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString('occupation', object.occupation)
    };
};