import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AllSpells from "../pages/AllSpells";
import "../styles/Home.css";

function WizardInfo() {
    const { id } = useParams();
    const [wizard, setWizard] = useState(null); // State to store wizard data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors

    // Fetch wizard data from the backend
    useEffect(() => {
        const fetchWizard = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/wizard/${id}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setWizard(data); // Save the wizard data in state
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                setError(error.message); // Save error message
                setLoading(false);
            }
        };

        fetchWizard();
    }, []); // Empty array ensures useEffect runs only once when the component mounts

    // Show loading or error messages if needed
    if (loading) return <p>Loading wizard data...</p>;
    if (error) return <p>Error: {error}</p>;

    // Render the wizard's information
    return (
        <div className="container mt-5">
            {wizard ? (
                <div>
                    <h2>
                        {wizard.name}, Level {wizard.level} Wizard
                    </h2>
                    <AllSpells />
                </div>
            ) : (
                <p>No wizard data available.</p>
            )}
        </div>
    );
}

export default WizardInfo;
