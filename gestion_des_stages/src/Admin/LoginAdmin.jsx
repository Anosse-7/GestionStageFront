import React, { useState } from 'react';
import './LoginAdmin.css'; // Vous pouvez ajouter une feuille de style distincte si nécessaire.
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginAdmin = () => {
    const [isLogin, setIsLogin] = useState(true); // Permet de basculer entre connexion et inscription
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '', // Ce champ n'est utilisé que lors de l'inscription
    });

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin); // Inverse la vue
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        if (!isLogin) {
            // Registration logic
            try {
                const response = await axios.post('http://localhost:8080/api/admin/register', {
                    nom: formData.lastName,
                    prenom: formData.firstName,
                    email: formData.email,
                    password: formData.password,
                });

                if (response.status === 200) {
                    alert(`Registration successful: ${response.data}`);
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration');
            }
        } else {
            // Login logic
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    email: formData.email,
                    password: formData.password,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    navigate(response.data);
                } else {
                    alert('Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login');
            }
        }
    };

    return (
        <div className="login-containerr">
            <Link to="/" className="arrow-buttonn">←</Link>

            <div className="form-wrapperr">
                <h1>{isLogin ? 'Connexion Admin' : 'Inscription Admin'}</h1>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="input-groupp">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-groupp">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="input-groupp">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-groupp">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="input-groupp">
                            <label>Confirmer le mot de passe</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="submit-btnn">
                        {isLogin ? 'Se connecter' : 'S’inscrire'}
                    </button>

                    <div className="toggle-form">
                        <p>
                            {isLogin
                                ? "Pas encore inscrit ? "
                                : "Déjà un compte ? "}
                            <span onClick={toggleForm}>
                                {isLogin ? 'Créer un compte' : 'Se connecter'}
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;