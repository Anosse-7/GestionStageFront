import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            if (Array.isArray(accounts)) {
                setAccounts([...accounts, formData]);
                setFormData({ email: '', password: '', role: '' });
                alert('Compte créé avec succès !');
            } else {
                alert('Erreur: "accounts" n\'est pas un tableau');
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
                        <label>Rôle:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="Encadrant">Encadrant</option>
                            <option value="Stagiaires">Stagiaires</option>
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