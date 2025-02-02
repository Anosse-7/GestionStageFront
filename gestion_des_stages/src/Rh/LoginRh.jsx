import React, { useState } from 'react';
import './LoginRh.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRH = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', formData); // Log the form data
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response); // Log the response

            if (response.status === 200) {
                const redirectUrl = response.data; // Assuming the redirect URL is in the response body
                navigate(redirectUrl); // Redirect to the URL provided in the response
            } else {
                setError('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <div className="login-containerr">
            <Link to="/" className="arrow-buttonn">&#8592;</Link>
            <div className="form-wrapperr">
                <h1 className="special-title">Login RH</h1>
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
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-btnn">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginRH;