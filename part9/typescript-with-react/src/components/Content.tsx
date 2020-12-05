import React, { FC } from 'react';
import { ContentProps } from 'interfaces/Courses';

const Content: FC<ContentProps> = props => {
    const { courseParts } = props;
    return (
        <>
            {courseParts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
        </>
    );
};

export default Content;