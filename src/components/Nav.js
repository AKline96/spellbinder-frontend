import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="container">
            <div className="row text-center">
                <h1>SpellBinder</h1>
            </div>
            <nav className="text-center">
                <NavLink to="/home">Wizards</NavLink> |{" "}
                <NavLink to="/allspells">Spells</NavLink> |{" "}
                <NavLink to="/AccountSettings">About</NavLink>
            </nav>
        </div>
    );
};

export default Nav;
