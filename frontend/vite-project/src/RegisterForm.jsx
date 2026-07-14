import { useState } from "react";

function RegisterForm({ onRegister }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(form);
    }

    return (

        <form className="login-form" onSubmit={handleSubmit}>

            <h2>Register</h2>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

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
                Register
            </button>

        </form>

    );

}

export default RegisterForm;