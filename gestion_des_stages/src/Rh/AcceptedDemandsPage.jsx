import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DemandsPage.css';

const AcceptedDemandsPage = () => {
    const [acceptedDemands, setAcceptedDemands] = useState([]);

    useEffect(() => {
        const fetchAcceptedDemands = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/rh/valideDemandes', {
                    params: { status: 'Acceptée' },
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    }
                });
                if (response.status === 200) {
                    console.log('Fetched accepted demands:', response.data); // Log the fetched demands
                    setAcceptedDemands(response.data);
                } else {
                    console.error('Failed to fetch accepted demands');
                }
            } catch (error) {
                console.error('Error fetching accepted demands:', error);
            }
        };

        fetchAcceptedDemands();
    }, []);

    return (
        <div className="page-container">
            <nav className="drawer">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/DemandsPage">Demandes</a></li>
                    <li><a href="/accepted">Demandes acceptées</a></li>
                    <li><a href="/refused">Demandes refusées</a></li>
                    <li><a href="/stages">Stage</a></li>
                    <li><a href="/AssignEncadrant">Assignation</a></li>
                </ul>
            </nav>
            <div className="content">
                <h1>Demandes Acceptées</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Durée</th>
                            <th>CV</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedDemands.length > 0 ? (
                            acceptedDemands.map((demand) => (
                                <tr key={demand.id}>
                                    <td>{demand.nom}</td>
                                    <td>{demand.prenom}</td>
                                    <td>{demand.email}</td>
                                    <td>{demand.duree}</td>
                                    <td>
                                        <a
                                            href={demand.cv}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-cv-link"
                                        >
                                            Consulter le CV
                                        </a>
                                    </td>
                                    <td>{demand.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Aucune demande acceptée disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AcceptedDemandsPage;