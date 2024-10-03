import { useState, useEffect } from "react";
import "../styles/AllSpells.css";
import { useParams } from "react-router-dom";

const AllSpells = ({ setKnownSpells }) => {
    const [spells, setSpells] = useState([]);
    const [details, setDetails] = useState("Select a spell to see details.");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { wizardId } = useParams();

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await fetch("http://localhost:3001/spells");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSpells(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSpells();
    }, []);

    const addSpellToLevelGroup = (spells, levelNum, levelGroup = []) => {
        spells.forEach((spell) => {
            if (spell.level === levelNum) {
                levelGroup.push(spell);
            }
        });
        return levelGroup;
    };

    const learnSpell = async () => {
        const res = await fetch(`http://localhost:3001/learnSpell`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wizardId,
                spellId: details.id,
            }),
        });
        const data = await res.json();
        console.log(data);
        setKnownSpells(data.knownSpells);
    };

    const levelGroups = [];
    for (let levelNum = 0; levelNum <= 9; levelNum++) {
        const levelGroup = addSpellToLevelGroup(spells, levelNum);
        levelGroups.push(levelGroup);
    }

    if (loading) return <p>Loading spells...</p>;
    if (error) return <p>Error fetching spells: {error}</p>;

    return (
        <div className="split-container" id="allspells">
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
            <div className="right-section card">
                <div className="card-body" id="details">
                    <h2>{details.name}</h2>
                    <h5>
                        <u>School:</u>
                    </h5>
                    {details.school}
                    <h5>
                        <u>Casting Time:</u>
                    </h5>{" "}
                    {details.casting_time}
                    <h5>
                        <u>Range:</u>
                    </h5>{" "}
                    {details.range}
                    <h5>
                        <u>Components:</u>
                    </h5>{" "}
                    {details.components}
                    <h5>
                        <u>Duration:</u>
                    </h5>{" "}
                    {details.duration}
                    <h5>
                        <u>Description:</u>
                    </h5>{" "}
                    {details.description}
                    <br></br>
                    <button className="btn btn-primary" onClick={learnSpell}>
                        Learn this Spell
                    </button>
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
                        {spellArray.map((spell) => (
                            <div
                                className="card"
                                key={spell.id} // Ensure each spell has a unique key
                                onClick={() => {
                                    setDetails(spell);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                {spell.name}
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllSpells;
