import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SpellList from "../components/SpellList"; // Import your new SpellList component
import "../styles/WizardInfo.css";

function WizardInfo() {
    const { wizardId } = useParams();
    const [wizard, setWizard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to calculate the proficiency bonus
    const calculateProficiencyBonus = (level) => {
        if (level < 1) return 0; // No proficiency bonus for level 0 or below
        else if (level <= 4) return 2;
        else if (level <= 8) return 3;
        else if (level <= 12) return 4;
        else if (level <= 16) return 5;
        else return 6;
    };

    // Function to calculate the spellcasting modifier
    const calculateSpellcastingModifier = (intelligenceScore) => {
        return Math.floor((intelligenceScore - 10) / 2);
    };

    // Function to calculate spell attack modifier and spell save DC
    const calculateSpellModifiers = (wizard) => {
        const intelligenceScore = wizard.intelligence_score;
        const level = wizard.level;

        const spellcastingModifier =
            calculateSpellcastingModifier(intelligenceScore);
        const proficiencyBonus = calculateProficiencyBonus(level);

        const spellAttackModifier = spellcastingModifier + proficiencyBonus;
        const spellSaveDC = 8 + spellcastingModifier + proficiencyBonus;

        return { spellAttackModifier, spellSaveDC };
    };

    useEffect(() => {
        const fetchWizard = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/wizard/${wizardId}`
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
    }, [wizardId]);

    if (loading) return <p>Loading wizard data...</p>;
    if (error) return <p>Error: {error}</p>;

    // Calculate spell modifiers if the wizard data is available
    const { spellAttackModifier, spellSaveDC } = wizard
        ? calculateSpellModifiers(wizard)
        : { spellAttackModifier: null, spellSaveDC: null };

    return (
        <div className="container mt-5">
            {wizard ? (
                <div>
                    <h2 className="wizardInfo">
                        {wizard.name}, Level {wizard.level} Wizard
                    </h2>
                    <p className="intelligenceScore">
                        Intelligence: {wizard.intelligence_score}
                    </p>
                    <p className="spellModifier">
                        Spellcasting Modifier:{" "}
                        {calculateSpellcastingModifier(
                            wizard.intelligence_score
                        )}
                    </p>
                    <p className="attackModifier">
                        Spell Attack Modifier: {spellAttackModifier}
                    </p>
                    <p className="spellSave">Spell Save DC: {spellSaveDC}</p>
                    <SpellList />
                </div>
            ) : (
                <p>No wizard data available.</p>
            )}
        </div>
    );
}

export default WizardInfo;
