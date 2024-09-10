import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="container">
            <div className="row text-center">
                <h1>SpellBinder</h1>
            </div>
            <div className="row text-center">
                <div className="col">
                    <Link to="/SpellList">Home</Link>
                </div>
                <div className="col">
                    <span className="divider">|</span>
                </div>
                <div className="col">
                    <Link to="/">Wizard</Link>
                </div>
                <div className="col">
                    <span className="divider">|</span>
                </div>
                <div className="col">
                    <Link to="/">Spells</Link>
                </div>
                <div className="col">
                    <span className="divider">|</span>
                </div>
                <div className="col">
                    <a href="#">Account</a>
                </div>
            </div>
        </div>
    );
};

export default Nav;
