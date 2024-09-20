import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem("loggedIn");
        if (isLoggedIn) {
            navigate("/home");
        }
    }, []);
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1>SpellBinder</h1>
                <p>
                    Your magical journey starts here, young wizard. Explore and
                    unleash your potential.
                </p>
                <Link to="/login">Log In</Link> |{" "}
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default Welcome;
