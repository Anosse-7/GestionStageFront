import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AssignEncadrant.css';

const AssignEncadrant = ({ accounts }) => {
    // Filtrer les comptes pour les stagiaires et les encadrants
    const stagiairesAccounts = accounts.filter(account => account.role === 'Stagiaires');
    const encadrantAccounts = accounts.filter(account => account.role === 'Encadrant');

    // État local pour gérer les assignations
    const [assignments, setAssignments] = useState({});

    // Initialiser les assignations si nécessaire
    useEffect(() => {
        const initialAssignments = {};
        stagiairesAccounts.forEach(stagiaire => {
            initialAssignments[stagiaire.email] = '';
        });
        setAssignments(initialAssignments);
    }, [stagiairesAccounts]);

    // Fonction pour gérer l'assignation
    const handleAssign = (stagiaireEmail, encadrantEmail) => {
        setAssignments(prev => ({
            ...prev,
            [stagiaireEmail]: encadrantEmail,
        }));
    };

    return (
        <div className="Page-container">
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
                <h1>Assignation d'Encadrants aux Stagiaires</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email du Stagiaire</th>
                            <th>Encadrant Assigné</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagiairesAccounts.map((stagiaire, index) => (
                            <tr key={index}>
                                <td>{stagiaire.email}</td>
                                <td>
                                    <select
                                        onChange={(e) =>
                                            handleAssign(stagiaire.email, e.target.value)
                                        }
                                        value={assignments[stagiaire.email] || ""}
                                    >
                                        <option value="" disabled>
                                            Choisir un encadrant
                                        </option>
                                        {encadrantAccounts.map((encadrant, idx) => (
                                            <option key={idx} value={encadrant.email}>
                                                {encadrant.email}
                                            </option>
                                        ))}
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

AssignEncadrant.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    })).isRequired,
};

export default AssignEncadrant;