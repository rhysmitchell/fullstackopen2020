import React from "react";
import { Entry } from "../types";
import Hospital from "./Hospital";
import HealthCheckData from "./HealthCheckData";
import OccupationalHealthcare from "./OccupationalHealthcare";

interface EntryDetailsProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<EntryDetailsProps> = (
  props: EntryDetailsProps
): JSX.Element => {
  const { entry } = props;

  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;

    case "HealthCheck":
      return <HealthCheckData entry={entry} />;

    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
