import React, { useEffect, useState } from 'react';
import './PageStages.css';
import axios from 'axios';

const PageStages = () => {
    const [stagiaires, setStagiaires] = useState([]);

    useEffect(() => {
        const fetchStagiaires = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/rh/stagiaires', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    }
                });

                if (response.status === 200) {
                    console.log('Fetched stagiaires:', response.data); // Log the fetched stagiaires
                    setStagiaires(response.data);
                } else {
                    console.error('Failed to fetch stagiaires');
                }
            } catch (error) {
                console.error('Error fetching stagiaires:', error);
            }
        };

        fetchStagiaires();
    }, []);

    return (
        <div className="page-container">
            <nav className="drawer">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/DemandsPage">Demandes</a></li>
                    <li><a href="/accepted">Demandes acceptées</a></li>
                    <li><a href="/refused">Demandes refusées</a></li>
                    <li><a href="/stages">Stages</a></li>
                    <li><a href="/AssignEncadrant">Assignation</a></li>
                </ul>
            </nav>

            <div className="content">
                <h1 id="stages">Gestion des Stages</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Sujet</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagiaires.map((stagiaire, index) => (
                            <tr key={index}>
                                <td>{stagiaire.email}</td>
                                <td>{stagiaire.sujet}</td>
                                <td>
                                    <span className={`statut ${stagiaire.statut ? stagiaire.statut.toLowerCase().replace(" ", "-") : ''}`}>
                                        {stagiaire.statut || 'N/A'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PageStages;