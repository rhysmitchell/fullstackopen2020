import React, { FC } from "react";
import { CoursePart } from "interfaces/Courses";
import Header from "components/Header";
import Content from "components/Content";
import Total from "components/Total";

const App: FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "React with TypeScript",
      exerciseCount: 14,
      description: "Basic rundown of writing React components with types",
      isBeginner: true,
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
