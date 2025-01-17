import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import "./Contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const contactSectionRef = useRef(null); // Référence à la section de contact

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);
    
    useEffect(() => {
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);
    
    const handleDropdownClick = (e) => e.stopPropagation();

    return (
        <div className="contact-page">
            <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
                <div className="navbar-content">
                    <div className="logo">
                        GESTION DES <span>STAGES</span>
                    </div>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/" className="nav-link">Accueil</Link></li>
                            <li><Link to="/about" className="nav-link">À propos</Link></li>
                            <li><Link to="/contact" className="nav-link">Contact</Link></li>
                            <li 
                                className={`dropdown ${isDropdownOpen ? "open" : ""}`}
                                onClick={handleDropdownClick}
                            >
                                <button className="dropdown-button" onClick={toggleDropdown}>
                                    Vous êtes <span className="dropdown-arrow">▼</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link to="/login-rh">Ressources Humaines</Link></li>
                                    <li><Link to="/loginStagiaires">Stagiaires</Link></li>
                                    <li><Link to="/LoginCandidat">Candidat</Link></li>
                                    <li><Link to="/LoginEncadrant">Encadrant</Link></li>
                                    <li><Link to="/login-admin">Administrateur</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="title-animation">Contactez-nous</span>
                        <span className="title-emphasis">Nous sommes là pour vous aider</span>
                    </h1>
                    <p className="hero-description">
                        Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.
                    </p>
                </div>
            </main>

            <div ref={contactSectionRef} className="contact-container">
                <div className="contact-content">
                    <h1>Contactez-nous</h1>
                    <div className="contact-info">
                        <h3>Informations de contact</h3>
                        <div className="info-item">
                            <strong>Adresse:</strong>
                            <p>123 Rue des Stages, 75000 Paris</p>
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong>
                            <p>contact@gestionstages.com</p>
                        </div>
                        <div className="info-item">
                            <strong>Téléphone:</strong>
                            <p>+33 1 23 45 67 89</p>
                        </div>
                        <div className="info-item">
                            <strong>Heures d'ouverture:</strong>
                            <p>Lundi - Vendredi: 9h00 - 18h00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;