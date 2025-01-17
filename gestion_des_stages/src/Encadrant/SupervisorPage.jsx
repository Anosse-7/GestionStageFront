import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SupervisorPage.css';

const SupervisorPage = ({ stagiaires, setStagiaires }) => {
    useEffect(() => {
        if (stagiaires.length === 0) {
            // Simuler une récupération de données depuis une source externe
            const initialData = [
                { email: "yacoubiwail@gmail.com", sujet: "", statut: "En cours" },
                { email: "testadd2@gmail.com", sujet: "", statut: "En cours" },
                { email: "CharkiOuiam@gmail.com", sujet: "", statut: "En cours" },
                { email: "tuhuhbit@gmail.com", sujet: "", statut: "En cours" },
            ];
            setStagiaires(initialData);
        }
    }, [stagiaires, setStagiaires]);

    const handleStatutChange = (index, newStatut) => {
        const updatedStagiaires = [...stagiaires];
        updatedStagiaires[index].statut = newStatut;
        setStagiaires(updatedStagiaires);
    };

    const handleSujetChange = (index, newSujet) => {
        const updatedStagiaires = [...stagiaires];
        updatedStagiaires[index].sujet = newSujet;
        setStagiaires(updatedStagiaires);
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
    stagiaires: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired,
        sujet: PropTypes.string,
        statut: PropTypes.string.isRequired,
    })).isRequired,
    setStagiaires: PropTypes.func.isRequired,
};

export default SupervisorPage;