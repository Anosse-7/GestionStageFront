import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SupervisorPage.css';

const SupervisorPage = ({ encadrantId }) => {
    const [stagiaires, setStagiaires] = useState([]);

    useEffect(() => {
        // Fetch all stagiaire accounts for the encadrant
        const fetchStagiaires = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/encadrant/getCondidats/${encadrantId}`);
                setStagiaires(response.data);
            } catch (error) {
                console.error('Error fetching stagiaire accounts:', error);
            }
        };

        fetchStagiaires();
    }, [encadrantId]);

    const handleStatutChange = async (index, newStatut) => {
        const updatedStagiaire = { ...stagiaires[index], statut: newStatut };
        try {
            const response = await axios.put(`http://localhost:8080/api/encadrant/updateCondidat/${updatedStagiaire.id}`, updatedStagiaire);
            if (response.status === 200) {
                const updatedStagiaires = [...stagiaires];
                updatedStagiaires[index] = response.data;
                setStagiaires(updatedStagiaires);
            } else {
                alert('Failed to update stagiaire');
            }
        } catch (error) {
            console.error('Error updating stagiaire:', error);
            alert('An error occurred during stagiaire update');
        }
    };

    const handleSujetChange = async (index, newSujet) => {
        const updatedStagiaire = { ...stagiaires[index], sujet: newSujet };
        try {
            const response = await axios.put(`http://localhost:8080/api/encadrant/updateCondidat/${updatedStagiaire.id}`, updatedStagiaire);
            if (response.status === 200) {
                const updatedStagiaires = [...stagiaires];
                updatedStagiaires[index] = response.data;
                setStagiaires(updatedStagiaires);
            } else {
                alert('Failed to update stagiaire');
            }
        } catch (error) {
            console.error('Error updating stagiaire:', error);
            alert('An error occurred during stagiaire update');
        }
    };

    return (
        <div className="Page-container">
            <nav className="drawer">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/SupervisorPage">Supervision</Link></li>
                </ul>
            </nav>
            <div className="content">
                <h1>Suivi des Stagiaires</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email du Stagiaire</th>
                            <th>Sujet</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagiaires.map((stagiaire, index) => (
                            <tr key={index}>
                                <td>{stagiaire.email}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={stagiaire.sujet}
                                        onChange={(e) => handleSujetChange(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={stagiaire.statut}
                                        onChange={(e) => handleStatutChange(index, e.target.value)}
                                    >
                                        <option value="En cours">En cours</option>
                                        <option value="Validé">Validé</option>
                                        <option value="Non validé">Non validé</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

SupervisorPage.propTypes = {
    encadrantId: PropTypes.number.isRequired,
};

export default SupervisorPage;