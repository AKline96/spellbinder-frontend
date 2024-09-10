import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loginFormSubmitted = (event) => {
        event.preventDefault();
        console.log("login form submitted");
        console.log(username, password);

        if (username !== "austin") {
            setError("Username incorrect");
        } else if (password !== "secret") {
            setError("Password Incorrect");
        } else {
            window.localStorage.setItem("loggedIn", "yes");
            //redirect
            navigate("/newWizard");
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
