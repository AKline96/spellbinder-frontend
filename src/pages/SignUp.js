import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signupFormSubmitted = async (event) => {
        event.preventDefault();
        console.log("signup form submitted");
        console.log(username, password);

        try {
            const response = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Signup failed");
            }

            const data = await response.json();
            console.log(data); // Handle successful signup response here

            // Optionally redirect to the login page or home page
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={signupFormSubmitted}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
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
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Account
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
