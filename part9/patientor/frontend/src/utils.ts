/* eslint-disable @typescript-eslint/no-explicit-any */

const isDate = (date: string): boolean => Boolean(Date.parse(date));

export { isDate };