/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient, Entry } from './types';
import { BaseEntry } from './interfaces';
import { v4 as uuid } from 'uuid';


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseString = (name: string, string: any): string => {
    if (!string || !isString(string)) {
        throw new Error(`Incorrect or missing string 'name': ${name}`);
    }

    return string;
};

const isNumber = (number: any): number is number => {
    return typeof number === 'number' || number instanceof Number;
};

const parseNumber = (name: string, number: any): number => {
    if (!number || !isNumber(number)) {
        throw new Error(`Incorrect or missing string 'name': ${name}`);
    }

    return number;
};

const parseStringArray = (name: string, strings: any[]): string[] => {

    if (!strings) {
        return [];
    }

    const nonStringValuesCount = strings.filter(item => !isString(item)).length;

    if (nonStringValuesCount > 0) {
        throw new Error(`One of the values wasn't a string: (${name})`);
    }

    const parsedStrings: string[] = strings.map(item => item as string);
    return parsedStrings;
};

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

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}}`);
    }
    return gender;
};

export const toPatient = (object: any): NewPatient => {
    return {
        name: parseString('name', object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString('ssn', object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString('occupation', object.occupation)
    };
};

export const toEntry = (object: any): Entry => {
    const baseEntry: BaseEntry = {
        id: uuid(),
        description: parseString('description', object.description),
        date: parseDate(object.date),
        specialist: parseString('specialist', object.specialist),
        diagnosisCodes: parseStringArray('diagnosisCodes', object.diagnosisCodes),
    };

    switch (object.type) {
        case "Hospital":
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString('discharge', object.discharge.criteria)
                }
            };

        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type: 'OccupationalHealthcare',
                employerName: parseString('employerName', object.employerName),
                sickLeave: {
                    startDate: (object.sickLeave.startDate ? parseDate(object.sickLeave.startDate) : undefined),
                    endDate: (object.sickLeave.endDate ? parseDate(object.sickLeave.endDate) : undefined),
                }
            };
        case "HealthCheck":
            return {
                ...baseEntry,
                type: 'HealthCheck',
                healthCheckRating: parseNumber('healthCheckRating', object.healthCheckRating)
            };

        default:
            throw new Error(`Undefined entry type`);
    }
};