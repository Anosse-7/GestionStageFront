import React from 'react';
import './PageStages.css';

const PageStages = ({ stagiaires }) => {
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
                                    <span className={`statut ${stagiaire.statut.toLowerCase().replace(" ", "-")}`}>
                                        {stagiaire.statut}
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
