import React, { useState, useEffect } from 'react';
import { Home, Users, UserCheck, UserPlus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RoleComptes.css';

const EncadrantsComptes = () => {
    const [encadrantAccounts, setEncadrantAccounts] = useState([]);
    const [activeLink, setActiveLink] = useState('encadrants');

    useEffect(() => {
        // Fetch all encadrant accounts
        const fetchEncadrants = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/encadrants');
                setEncadrantAccounts(response.data);
            } catch (error) {
                console.error('Error fetching encadrant accounts:', error);
            }
        };

        fetchEncadrants();
    }, []);

    const handleEdit = async (index) => {
        const newPassword = prompt("Entrez le nouveau mot de passe:");
        if (newPassword) {
            const updatedAccount = { ...encadrantAccounts[index], password: newPassword };
            try {
                const response = await axios.put(`http://localhost:8080/api/admin/encadrants/${updatedAccount.id}`, updatedAccount);
                if (response.status === 200) {
                    const updatedAccounts = [...encadrantAccounts];
                    updatedAccounts[index] = response.data;
                    setEncadrantAccounts(updatedAccounts);
                } else {
                    alert('Failed to update account');
                }
            } catch (error) {
                console.error('Error updating account:', error);
                alert('An error occurred during account update');
            }
        }
    };

    const handleDelete = async (index) => {
        const accountId = encadrantAccounts[index].id;
        try {
            const response = await axios.delete(`http://localhost:8080/api/admin/encadrants/${accountId}`);
            if (response.status === 204) {
                const updatedAccounts = encadrantAccounts.filter((_, i) => i !== index);
                setEncadrantAccounts(updatedAccounts);
            } else {
                alert('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred during account deletion');
        }
    };

    const sidebarLinks = [
        { key: 'accueil', icon: Home, label: 'Accueil', path: '/' },
        { key: 'admin', icon: Settings, label: 'Admin', path: '/AdminPage' },
        { key: 'encadrants', icon: UserCheck, label: 'Comptes - Encadrants', path: '/EncadrantsComptes' },
        { key: 'stagiaires', icon: Users, label: 'Comptes - Stagiaires', path: '/StagiairesComptes' },
        { key: 'rh', icon: UserPlus, label: 'Comptes - RH', path: '/RHComptes' }
    ];

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
                <h1>Comptes - Encadrants</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Mot de passe</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encadrantAccounts.map((account, index) => (
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

export default EncadrantsComptes;