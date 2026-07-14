import { useState } from "react";

function LoginForm({ onLogin }) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    function handleSubmit(e) {

        e.preventDefault();
        onLogin(user);

    }

    return (

        <form className="login-form" onSubmit={handleSubmit}>

            <h2>Login</h2>

            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <button>
                Login
            </button>

        </form>

    );

}

export default LoginForm;