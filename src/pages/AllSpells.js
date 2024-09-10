import { useState, useEffect } from "react";
import "../styles/Home.css";
import spells from "../data/spells.json";

const AllSpells = () => {
    const [details, setDetails] = useState("Select a spell to see details.");
    const addSpellToLevelGroup = (spells, levelNum, levelGroup = []) => {
        spells.forEach((spell) => {
            if (spell.level === levelNum) {
                levelGroup.push(spell);
            }
        });
        return levelGroup;
    };
    const levelGroups = [];

    // Populate each LevelGroup based on the levelNum
    for (let levelNum = 0; levelNum <= 9; levelNum++) {
        const levelGroup = addSpellToLevelGroup(spells, levelNum);
        levelGroups.push(levelGroup);
    }

    return (
        <div className="split-container">
            <div className="left-section">
                {levelGroups.map((levelGroup, index) => (
                    <LevelGroup
                        key={index}
                        levelNum={index}
                        spellArray={levelGroup}
                        setDetails={setDetails}
                    />
                ))}
            </div>
            <div className="right-section">
                <div></div>
                <div id="details">
                    <h2>Spell: {details.name}</h2>
                    <h5>School: {details.school}</h5>
                    <h5>Casting Time: {details.casting_time}</h5>
                    <h5>Range: {details.range}</h5>
                    <h5>Components: {details.components}</h5>
                    <h5>Duration: {details.duration}</h5>
                    <h5>
                        Description:
                        <br /> {details.description}
                    </h5>
                </div>
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
                        {spellArray.map((spell) => {
                            return (
                                <li
                                    onClick={() => {
                                        setDetails(spell);
                                    }}
                                >
                                    {spell.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllSpells;
