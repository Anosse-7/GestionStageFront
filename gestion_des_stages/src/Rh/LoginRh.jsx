import React, { useState } from 'react';
import './LoginRh.css';
import { Link } from 'react-router-dom';

const LoginRH = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données soumises :", formData);
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
                    <button type="submit" className="submit-btnn">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginRH;