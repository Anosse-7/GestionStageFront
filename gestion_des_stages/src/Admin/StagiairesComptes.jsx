import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RoleComptes.css';

const StagiairesComptes = () => {
    const [stagiairesAccounts, setStagiairesAccounts] = useState([]);

    useEffect(() => {
        // Fetch stagiaire accounts from the backend
        const fetchStagiairesAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/stagiaires');
                setStagiairesAccounts(response.data);
            } catch (error) {
                console.error('Error fetching stagiaire accounts:', error);
            }
        };

        fetchStagiairesAccounts();
    }, []);

    const handleEdit = async (index) => {
        const newPassword = prompt("Entrez le nouveau mot de passe:");
        if (newPassword) {
            try {
                const updatedAccount = { ...stagiairesAccounts[index], password: newPassword };
                await axios.put(`http://localhost:8080/api/admin/stagiaires/${updatedAccount.id}`, updatedAccount);
                const updatedAccounts = [...stagiairesAccounts];
                updatedAccounts[index] = updatedAccount;
                setStagiairesAccounts(updatedAccounts);
            } catch (error) {
                console.error('Error updating password:', error);
            }
        }
    };

    const handleDelete = async (index) => {
        try {
            const accountId = stagiairesAccounts[index].id;
            await axios.delete(`http://localhost:8080/api/admin/stagiaires/${accountId}`);
            const updatedAccounts = stagiairesAccounts.filter((_, i) => i !== index);
            setStagiairesAccounts(updatedAccounts);
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div className="Page-container">
            <nav className="drawer" style={{ width: '267px' , backgroundColor: '#4b4033'}}>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/AdminPage">Admin</Link></li>
                    <li><Link to="/EncadrantsComptes">Comptes - Encadrants</Link></li>
                    <li><Link to="/StagiairesComptes">Comptes - Stagiaires</Link></li>
                    <li><Link to="/RHComptes">Comptes - RH</Link></li>
                </ul>
            </nav>

            <div className="content" style={{ backgroundImage: 'linear-gradient(to right, #F5DEB3)' }}>
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

export default StagiairesComptes;