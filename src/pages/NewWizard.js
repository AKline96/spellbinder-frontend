import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function NewWizard() {
    const navigate = useNavigate();
    const [wizard, setWizard] = useState({
        name: "",
        intelligence_score: "",
        level: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setWizard({
            ...wizard,
            [name]: value,
        });
    };

    const token = window.localStorage.getItem("token"); // Get the JWT token

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Wizard Information:", wizard);
        try {
            const response = await fetch(`http://localhost:3001/wizard`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token
                },
                body: JSON.stringify(wizard),
            });
            const data = await response.json();
            console.log("Wizard Created", data);
            navigate(`/viewWizard/${data.newWizard.id}`);
        } catch (error) {
            console.error("Error creating wizard:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create a New Wizard</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={wizard.name}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="intelligence_score" className="form-label">
                        Intelligence:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="intelligence_score"
                        name="intelligence_score"
                        value={wizard.intelligence_score}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="level" className="form-label">
                        Level:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="level"
                        name="level"
                        value={wizard.level}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Wizard
                </button>
            </form>
        </div>
    );
}

export default NewWizard;
