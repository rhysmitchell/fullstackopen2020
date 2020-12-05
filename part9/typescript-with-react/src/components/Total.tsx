import React, { FC } from "react";
import { ContentProps } from "interfaces/Courses";

const Total: FC<ContentProps> = (props) => {
  const { courseParts } = props;

  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
