import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Remove the 'loggedIn' item from localStorage to log the user out
        window.localStorage.removeItem("loggedIn");

        // 2. Navigate the user to the welcome or login page
        navigate("/welcome");
    };
    return (
        <div className="container">
            <div className="row text-center">
                <h1>SpellBinder</h1>
            </div>
            <nav className="text-center">
                <NavLink to="/home">Wizards</NavLink> |{" "}
                <NavLink to="/allspells">Spells</NavLink> |{" "}
                <NavLink to="/AccountSettings">About</NavLink> |{" "}
                <button onClick={handleLogout}>Log Out</button>
            </nav>
        </div>
    );
};

export default Nav;
