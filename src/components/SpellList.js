import React, { useState, useEffect } from "react";
import AllSpells from "../pages/AllSpells";
import { useParams } from "react-router-dom";

const SpellList = ({}) => {
    const [allSpells, setAllSpells] = useState([]);
    const [knownSpells, setKnownSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { wizardId } = useParams();
    const [expanded, setExpanded] = useState(false);

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
                console.log(data);
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

    const addSpellToLevelGroup = (knownSpells, levelNum, levelGroup = []) => {
        knownSpells.forEach((knownSpell) => {
            if (knownSpell.spell.level === levelNum) {
                levelGroup.push(knownSpell);
            }
        });
        return levelGroup;
    };
    const levelGroups = [];
    for (let levelNum = 0; levelNum <= 9; levelNum++) {
        const levelGroup = addSpellToLevelGroup(knownSpells, levelNum);
        levelGroups.push(levelGroup);
    }

    if (loading) return <p>Loading spells...</p>;
    if (error) return <p>Error fetching spells: {error}</p>;
    console.log(levelGroups);
    return (
        <div className="split-container" id="allspells">
            <div className="card">
                <h4>Known Spells</h4>
                <div className="left-section">
                    <div className="card-body">
                        {levelGroups.map((levelGroup, index) => (
                            <LevelGroup
                                key={index}
                                levelNum={index}
                                spellArray={levelGroups}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="right-section">
                <h4>Add Spells</h4>
                <AllSpells setKnownSpells={setKnownSpells} />
            </div>
        </div>
    );
};

const LevelGroup = ({ levelNum, spellArray, setDetails }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="card">
            <div className="card-body">
                <h2
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {expanded ? (
                        <i className="bi bi-chevron-up"></i>
                    ) : (
                        <i className="bi bi-chevron-down"></i>
                    )}
                    {levelNum === 0 ? "Cantrips" : `Level ${levelNum}`}
                </h2>
                {expanded && (
                    <ul>
                        {spellArray[levelNum].map((spell) => (
                            <div
                                className="card"
                                // key={knownSpells.spell.id} // Ensure each spell has a unique key
                            >
                                {spell.spell.name}
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default SpellList;
