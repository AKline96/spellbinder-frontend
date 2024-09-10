import { useState, useEffect } from "react";
import "../styles/Home.css";
import spells from "../data/spells.json";
import { Link } from "react-router-dom";

const Home2 = () => {
    const [wizard, setWizard] = useState({
        name: "",
        level: "",
        intelligence_score: "",
    });
    const [allWizards, setAllWizards] = useState([]);

    useEffect(() => {
        const fetchWizardData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/wizard`);
                const data = await response.json();
                setWizard(data); // Set the fetched wizard data
                console.log(data);
                setAllWizards(data.wizard);
            } catch (error) {
                console.error("Error fetching wizard data:", error);
            }
        };

        fetchWizardData();
    }, []); // Rerun the effect when the id changes

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
        <div className="container" id="home">
            {allWizards.map((wizard) => {
                return (
                    <div className="card">
                        <Link
                            className="custom-link"
                            to={`/viewWizard/${wizard.id}`}
                        >
                            {wizard.name}, Level {wizard.level}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Home2;
