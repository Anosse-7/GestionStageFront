import React, { useState } from 'react';
import './LoginEncadrant.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginEncadrant = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', formData); // Log the form data
        if (formData.email && formData.password) {
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    email: formData.email,
                    password: formData.password,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Login response:', response); // Log the login response

                if (response.status === 200) {
                    const { token, redirectUrl } = response.data; // Extract token and redirect URL from the response
                    localStorage.setItem('token', token); // Store the token in local storage
                    navigate(redirectUrl); // Redirect to the URL provided in the response
                } else {
                    alert('Échec de la connexion');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Une erreur est survenue lors de la connexion');
            }
        } else {
            alert('Veuillez remplir tous les champs !');
        }
    };

    return (
        <div className="login-containerr">
            <Link to="/" className="arrow-buttonn">&#8592;</Link>
            <div className="form-wrapperr">
                <h1 className="special-title">Login Encadrant</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupp">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <i className="fas fa-envelope icon"></i> {/* Icône pour l'email */}
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
                        <i className="fas fa-lock icon"></i> {/* Icône pour le mot de passe */}
                    </div>
                    <button type="submit" className="submit-btnn">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginEncadrant;