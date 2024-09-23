import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SpellList from "../components/SpellList"; // Import your new SpellList component
import "../styles/Home.css";

function WizardInfo() {
    const { id } = useParams();
    const [wizard, setWizard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log(data); // Log the fetched data to check its structure
                setWizard(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWizard();
    }, [id]);

    if (loading) return <p>Loading wizard data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            {wizard ? (
                <div>
                    <h2>
                        {wizard.name}, Level {wizard.level} Wizard
                    </h2>
                    <SpellList wizardId={wizard.id} />
                </div>
            ) : (
                <p>No wizard data available.</p>
            )}
        </div>
    );
}

export default WizardInfo;
