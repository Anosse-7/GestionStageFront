import React from 'react';
import './DemandsPage.css';

const RefusedDemandsPage = ({ rejectedDemands }) => {
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
                <h1>Demandes Refusées</h1>
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
                        {rejectedDemands.map((demand) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RefusedDemandsPage;