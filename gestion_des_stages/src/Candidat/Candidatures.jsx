import React, { useState } from 'react';
import './Candidatures.css';
import axios from 'axios';

const Candidatures = ({ demands, setDemands }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        duree: '',
        description: '',
        CIN: '',
        cv: null,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            setError('Veuillez sélectionner un fichier au format PDF.');
            return;
        }
        setFormData({ ...formData, cv: file });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nom || !formData.prenom || !formData.email || !formData.duree || !formData.CIN || !formData.cv) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('prenom', formData.prenom);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('duree', formData.duree);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('CIN', formData.CIN);
        formDataToSend.append('cv', formData.cv);

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/condidat/demand', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                },
            });

            if (response.status === 200) {
                const newDemand = {
                    id: demands.length + 1,
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    duree: formData.duree,
                    description: formData.description,
                    CIN: formData.CIN,
                    etat: 'enAttente',
                    cv: URL.createObjectURL(formData.cv),
                };

                setDemands([...demands, newDemand]); // Mise à jour de l'état global

                setSuccess('Candidature soumise avec succès !');
                setError('');
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    duree: '',
                    description: '',
                    CIN: '',
                    cv: null,
                });
            } else {
                setError('Échec de la soumission de la candidature.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur est survenue lors de la soumission de la candidature.');
        }
    };

    return (
        <div className="page-container">
            <nav className="drawer">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/Candidatures">Candidature</a></li>
                </ul>
            </nav>

            <div className="content">
                <h1>Formulaire de Candidature</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit} className="application-form">
                    <div className="form-group">
                        <label>Nom :</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            placeholder="Entrez votre nom"
                        />
                    </div>
                    <div className="form-group">
                        <label>Prénom :</label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            placeholder="Entrez votre prénom"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email :</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Entrez votre email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Numéro CIN :</label>
                        <input
                            type="text"
                            name="CIN"
                            value={formData.CIN}
                            onChange={handleInputChange}
                            placeholder="Entrez votre numéro de CIN"
                        />
                    </div>
                    <div className="form-group">
                        <label>Durée du stage :</label>
                        <select
                            name="duree"
                            value={formData.duree}
                            onChange={handleInputChange}
                        >
                            <option value="">Choisissez une durée</option>
                            <option value="UneMois">1 mois</option>
                            <option value="TroisMois">3 mois</option>
                            <option value="SixMois">6 mois</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>CV (PDF uniquement) :</label>
                        <input
                            type="file"
                            name="cv"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description :</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Décrivez votre demande"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Soumettre</button>
                </form>
            </div>
        </div>
    );
};

export default Candidatures;