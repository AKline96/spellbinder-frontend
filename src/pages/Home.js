import { useState, useEffect } from "react";
import "../styles/Home.css";
import spells from "../data/spells.json";
import { Link, useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const handleNewWizard = () => {
        navigate("/newwizard"); // Replace with the correct path for your NewWizard page
    };

    const handleDeleteWizard = async (id) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this wizard?"
        );

        if (isConfirmed) {
            try {
                const response = await fetch(
                    `http://localhost:3001/wizard/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    const updatedResponse = await fetch(
                        `http://localhost:3001/wizard`
                    );
                    const updatedData = await updatedResponse.json();
                    setAllWizards(updatedData.wizard);
                } else {
                    console.error(
                        "Error deleting wizard:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error deleting wizard:", error);
            }
        }
    };

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
        <div className="" id="home">
            {allWizards.map((wizard) => {
                return (
                    <div className="card">
                        <Link
                            className="custom-link"
                            to={`/viewWizard/${wizard.id}`}
                        >
                            {wizard.name}, Level {wizard.level}
                            <button
                                className="btn btn-danger"
                                style={{ float: "right" }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleDeleteWizard(wizard.id);
                                }}
                            >
                                Delete Wizard
                            </button>
                        </Link>
                    </div>
                );
            })}
            <button onClick={handleNewWizard} className="btn btn-primary">
                Create New Wizard
            </button>
        </div>
    );
};

export default Home2;
