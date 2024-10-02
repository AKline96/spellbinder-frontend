import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Remove the 'loggedIn' item from localStorage to log the user out
        window.localStorage.removeItem("loggedIn");

        // 2. Navigate the user to the welcome or login page
        navigate("/welcome");
    };
    return (
        <div className="">
            <div className="row text-center">
                <h1 className="allura-regular">SpellBinder</h1>
            </div>
            <nav className="text-center">
                <NavLink className="home" to="/home">
                    Wizards
                </NavLink>{" "}
                |{" "}
                <NavLink className="spells" to="/allspells">
                    Spells
                </NavLink>{" "}
                | {/* <NavLink to="/AccountSettings">About</NavLink> |{" "} */}
                <button className="btn btn-danger" onClick={handleLogout}>
                    Log Out
                </button>
            </nav>
        </div>
    );
};

export default Nav;
