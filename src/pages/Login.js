import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loginFormSubmitted = async (event) => {
        event.preventDefault();
        console.log("login form submitted");
        console.log(username, password);

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming you receive a success message or token
                window.localStorage.setItem("loggedIn", "yes");
                // Redirect
                navigate("/newWizard");
            } else {
                setError(data.message); // Show error from server
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={loginFormSubmitted}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(evt) => {
                            setUsername(evt.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(evt) => {
                            setPassword(evt.target.value);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <p style={{ color: "red" }}>{error}</p>
            </form>
        </div>
    );
};

export default Login;
