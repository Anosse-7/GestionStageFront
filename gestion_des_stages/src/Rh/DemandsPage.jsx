import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DemandsPage.css';

const DemandsPage = ({ setAcceptedDemands }) => {
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        const fetchDemands = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/rh/demandes', {
                    params: { status: 'enAttente' },
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    }
                });
                if (response.status === 200) {
                    console.log('Fetched demands:', response.data); // Log the fetched demands
                    setDemands(response.data);
                } else {
                    console.error('Failed to fetch demands');
                }
            } catch (error) {
                console.error('Error fetching demands:', error);
            }
        };

        fetchDemands();
    }, []);

    const handleAccept = async (id) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        try {
            const response = await axios.put('http://localhost:8080/api/rh/validerDemande', null, {
                params: { id },
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                }
            });
            if (response.status === 200) {
                const acceptedDemand = demands.find(d => d.id === id);
                setAcceptedDemands(prev => [...prev, { ...acceptedDemand, status: 'Acceptée' }]);
                setDemands(demands.filter(d => d.id !== id));
                alert(`Demande acceptée pour l'ID : ${id}`);
            } else {
                alert('Failed to accept demand');
            }
        } catch (error) {
            console.error('Error accepting demand:', error);
            alert('An error occurred while accepting the demand');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        try {
            const response = await axios.put('http://localhost:8080/api/rh/nonValiderDemande', null, {
                params: { id },
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                }
            });
            if (response.status === 200) {
                setDemands(demands.map(d => d.id === id ? { ...d, status: 'Refusée' } : d));
                alert(`Demande refusée pour l'ID : ${id}`);
            } else {
                alert('Failed to reject demand');
            }
        } catch (error) {
            console.error('Error rejecting demand:', error);
            alert('An error occurred while rejecting the demand');
        }
    };

    return (
        <div className="page-container">
            <nav className="drawer">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/DemandsPage">Demandes</Link></li>
                    <li><a href="/accepted">Demandes acceptées</a></li>
                    <li><a href="/refused">Demandes refusées</a></li>
                    <li><a href="/stages">Stages</a></li>
                    <li><a href="/AssignEncadrant">Assignation</a></li>
                </ul>
            </nav>
            <div className="contentt">
                <h1 id="demandes">Liste des Demandes</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Numéro CIN</th>
                            <th>Durée</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>CV</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demands.length > 0 ? (
                            demands.map((demand) => (
                                <tr key={demand.id}>
                                    <td>{demand.nom}</td>
                                    <td>{demand.prenom}</td>
                                    <td>{demand.email}</td>
                                    <td>{demand.CIN}</td>
                                    <td>{demand.duree}</td>
                                    <td>{demand.description}</td>
                                    <td>{demand.etat}</td>
                                    <td>
                                        {demand.cv ? (
                                            <a
                                                href={demand.cv}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-cv-link"
                                            >
                                                Consulter le CV
                                            </a>
                                        ) : (
                                            <span>Pas de CV</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="accept-btn"
                                            onClick={() => handleAccept(demand.id)}
                                        >
                                            Accepter
                                        </button>
                                        <button
                                            className="reject-btn"
                                            onClick={() => handleReject(demand.id)}
                                        >
                                            Refuser
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">Aucune demande disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DemandsPage;