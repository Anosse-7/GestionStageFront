import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SupervisorPage.css';

const SupervisorPage = () => {
    const [stagiaires, setStagiaires] = useState([]);
    const [updatedStagiaires, setUpdatedStagiaires] = useState([]);

    useEffect(() => {
        const fetchStagiaires = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/encadrant/stagiaires');
                const sanitizedData = response.data.map(stagiaire => ({
                    ...stagiaire,
                    id: stagiaire.id || 'N/A', // Likely inherited from User class
                    statut: stagiaire.statut || 'En cours', // Matches Status statut
                    nom: stagiaire.nom || 'N/A', // Likely inherited from User class
                    prenom: stagiaire.prenom || 'N/A', // Likely inherited from User class
                    sujet: stagiaire.sujet || 'N/A', // Matches String sujet
                }));
                console.log('Fetched stagiaires:', sanitizedData);
                setStagiaires(sanitizedData);
                setUpdatedStagiaires(sanitizedData);
            } catch (error) {
                console.error('Error fetching stagiaire accounts:', error);
            }
        };

        fetchStagiaires();
    }, []);

    const handleStatutChange = (index, newStatut) => {
        const updatedStagiaire = { ...updatedStagiaires[index], statut: newStatut };
        const newUpdatedStagiaires = [...updatedStagiaires];
        newUpdatedStagiaires[index] = updatedStagiaire;
        setUpdatedStagiaires(newUpdatedStagiaires);
    };

    const handleSujetChange = (index, newSujet) => {
        const updatedStagiaire = { ...updatedStagiaires[index], sujet: newSujet };
        const newUpdatedStagiaires = [...updatedStagiaires];
        newUpdatedStagiaires[index] = updatedStagiaire;
        setUpdatedStagiaires(newUpdatedStagiaires);
    };

    const handleSubmit = async (index) => {
        const updatedStagiaire = updatedStagiaires[index];

        // Validate the updated data
        if (!updatedStagiaire.id || !updatedStagiaire.statut || !updatedStagiaire.sujet) {
            console.error('Invalid stagiaire data:', updatedStagiaire);
            alert('Invalid stagiaire data. Please check the inputs.');
            return;
        }

        console.log('Updating stagiaire:', updatedStagiaire);

        try {
            const response = await axios.put(`http://localhost:8080/api/encadrant/stagiaire/update/${updatedStagiaire.id}`, updatedStagiaire);
            if (response.status === 200) {
                const newStagiaires = [...stagiaires];
                newStagiaires[index] = response.data;
                setStagiaires(newStagiaires);
                alert('Stagiaire updated successfully');
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagiaires.map((stagiaire, index) => (
                            <tr key={index}>
                                <td>{stagiaire.email}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={updatedStagiaires[index].sujet}
                                        onChange={(e) => handleSujetChange(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={updatedStagiaires[index].statut}
                                        onChange={(e) => handleStatutChange(index, e.target.value)}
                                    >
                                        <option value="EnCour">En cours</option>
                                        <option value="Terminer">Validé</option>
                                        <option value="Annuler">Non validé</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleSubmit(index)}>Submit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupervisorPage;