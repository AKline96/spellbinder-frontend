import React, { useState, useEffect } from "react";
import AllSpells from "../pages/AllSpells";

const SpellList = ({ wizardId }) => {
    const [allSpells, setAllSpells] = useState([]);
    const [knownSpells, setKnownSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!wizardId) {
            setLoading(false); // Stop loading if no wizardId is provided
            return;
        }

        const fetchSpells = async () => {
            try {
                const response = await fetch(`http://localhost:3001/spells`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllSpells(data); // Save all spells
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchKnownSpells = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/wizards/${wizardId}/spells`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setKnownSpells(data); // Save known spells
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Stop loading in both cases (success or error)
            }
        };

        fetchSpells();
        fetchKnownSpells();
    }, [wizardId]);

    const toggleSpell = async (spellId) => {
        const updatedSpells = knownSpells.map((spell) =>
            spell.id === spellId
                ? { ...spell, is_known: !spell.is_known }
                : spell
        );
        setKnownSpells(updatedSpells);

        // Update the known status in the database
        try {
            const response = await fetch(
                `http://localhost:3001/wizards/${wizardId}/spells/${spellId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        is_known: !updatedSpells.find(
                            (spell) => spell.id === spellId
                        ).is_known,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update spell status:", error);
        }
    };

    if (loading) return <p>Loading spells...</p>;
    if (error) return <p>Error fetching spells: {error}</p>;

    return (
        <div className="split-container" id="allspells">
            <h4>Known Spells</h4>
            <div className="left-section">
                {allSpells.map((spell) => (
                    <div
                        key={spell.id}
                        className="spell-item"
                        onClick={() => toggleSpell(spell.id)}
                        style={{
                            cursor: "pointer",
                            textDecoration: knownSpells.some(
                                (s) => s.id === spell.id && s.is_known
                            )
                                ? "underline"
                                : "none",
                        }}
                    >
                        {spell.name}{" "}
                        {knownSpells.some(
                            (s) => s.id === spell.id && s.is_known
                        )
                            ? "(Known)"
                            : "(Unknown)"}
                    </div>
                ))}
            </div>
            <div className="right-section">
                <AllSpells />
            </div>
        </div>
    );
};

export default SpellList;
