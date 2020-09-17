import React from 'react';

const WelcomeMessage = ({ user }) => {
    if (!user) {
        return <></>;
    }

    return (
        <>{user.name} is logged in</>
    );
};

export default WelcomeMessage;