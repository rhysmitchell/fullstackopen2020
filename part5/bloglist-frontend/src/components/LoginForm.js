import React from 'react';

const LoginForm = ({ user, handleLogin, username, setUsername, password, setPassword }) => {
    if (user) {
        return <></>;
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
      <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
            </div>
            <div>
                password
      <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>);
};

export default LoginForm;