import React from 'react';
import { Link } from 'react-router-dom';
import './DemandsPage.css';

const DemandsPage = ({ demands, setDemands, setAcceptedDemands }) => {
    const handleAccept = (id) => {
        const acceptedDemand = demands.find(d => d.id === id);
        setAcceptedDemands(prev => [...prev, { ...acceptedDemand, status: 'Acceptée' }]);
        setDemands(demands.filter(d => d.id !== id));
        alert(`Demande acceptée pour l'ID : ${id}`);
    };

    const handleReject = (id) => {
        setDemands(demands.map(d => d.id === id ? { ...d, status: 'Refusée' } : d));
        alert(`Demande refusée pour l'ID : ${id}`);
    };

    console.log('Demandes reçues dans DemandsPage :', demands);

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
                                    <td>{demand.nCin}</td>
                                    <td>{demand.duree}</td>
                                    <td>{demand.description}</td>
                                    <td>{demand.status}</td>
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