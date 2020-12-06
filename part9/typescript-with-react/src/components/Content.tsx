import React, { FC } from "react";
import { ContentProps } from "interfaces/Courses";
import Part from "components/Part";

const Content: FC<ContentProps> = (props) => {
  const { courseParts } = props;

  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
};

export default Content;
