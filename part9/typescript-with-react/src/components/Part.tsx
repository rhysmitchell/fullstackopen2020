import React, { FC } from "react";
import { PartProps } from "interfaces/Courses";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: FC<PartProps> = (props) => {
  const { coursePart } = props;
  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <>
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.description}</p>
        </>
      );

    case "Using props to pass data":
      return (
        <>
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.groupProjectCount}</p>
        </>
      );

    case "Deeper type usage":
      return (
        <>
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.description}</p>
          <p>{coursePart.exerciseSubmissionLink}</p>
        </>
      );

    case "React with TypeScript":
      return (
        <>
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.description}</p>
          <p>Beginner: {coursePart.isBeginner ? "✔" : "✗"}</p>
        </>
      );

    default:
      return assertNever(coursePart);
  }
  return <div></div>;
};

export default Part;
