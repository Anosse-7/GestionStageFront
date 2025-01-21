import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = ({ accounts, setAccounts }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Encadrant',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            try {
                const role = formData.role.toUpperCase();
                console.log(`Sending request to: http://localhost:8080/api/admin/add/${role}`);
                const response = await axios.post(`http://localhost:8080/api/admin/add/${role}`, null, {
                    params: {
                        email: formData.email,
                        password: formData.password,
                        role: role,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (response.status === 200) {
                    if (Array.isArray(accounts)) {
                        setAccounts([...accounts, formData]);
                        setFormData({ email: '', password: '', role: 'Encadrant' });
                        alert('Compte créé avec succès !');
                    } else {
                        alert('Erreur: "accounts" n\'est pas un tableau');
                    }
                } else {
                    alert('Échec de la création du compte');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Une erreur est survenue lors de la création du compte');
            }
        } else {
            alert('Veuillez remplir tous les champs !');
        }
    };

    return (
        <div className="admin-container">
            <nav className="drawer">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><Link to="/AdminPage">Admin</Link></li>
                    <li><Link to="/EncadrantsComptes">Comptes - Encadrants</Link></li>
                    <li><Link to="/StagiairesComptes">Comptes - Stagiaires</Link></li>
                    <li><Link to="/RHComptes">Comptes - RH</Link></li>
                </ul>
            </nav>

            <div className="content">
                <h1>Administration - Gestion des Comptes</h1>
                <form onSubmit={handleSubmit} className="account-form">
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="ENCADRANT">Encadrant</option>
                            <option value="STAGIAIRE">Stagiaire</option>
                            <option value="RH">RH</option>
                        </select>
                    </div>
                    <button type="submit">Créer un compte</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;