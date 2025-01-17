import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RoleComptes.css';

const StagiairesComptes = ({ accounts }) => {
    const [stagiairesAccounts, setStagiairesAccounts] = useState(accounts.filter(account => account.role === 'Stagiaires'));

    const handleEdit = (index) => {
        const newPassword = prompt("Entrez le nouveau mot de passe:");
        if (newPassword) {
            const updatedAccounts = [...stagiairesAccounts];
            updatedAccounts[index].password = newPassword;
            setStagiairesAccounts(updatedAccounts);
        }
    };

    const handleDelete = (index) => {
        const updatedAccounts = stagiairesAccounts.filter((_, i) => i !== index);
        setStagiairesAccounts(updatedAccounts);
    };

    return (
        <div className="Page-container">
            <nav className="drawer">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/AdminPage">Admin</Link></li>
                    <li><Link to="/EncadrantsComptes">Comptes - Encadrants</Link></li>
                    <li><Link to="/StagiairesComptes">Comptes - Stagiaires</Link></li>
                    <li><Link to="/RHComptes">Comptes - RH</Link></li>
                </ul>
            </nav>

            <div className="content">
                <h1>Comptes - Stagiaires</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Mot de passe</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagiairesAccounts.map((account, index) => (
                            <tr key={index}>
                                <td>{account.email}</td>
                                <td>{account.password}</td>
                                <td>
                                    <button onClick={() => handleEdit(index)}>✏️</button>
                                    <button onClick={() => handleDelete(index)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

StagiairesComptes.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    })).isRequired,
};

export default StagiairesComptes;