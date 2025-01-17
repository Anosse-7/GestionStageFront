import React, { useState, useEffect } from "react";
import "./Home.css"; // Réutiliser les mêmes styles que Home
import "./About.css"; // Importez les styles spécifiques à la page About
import { Link } from "react-router-dom";

const About = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Gestion du scroll pour le changement de style de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Gestion du menu déroulant
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Fonction pour fermer le dropdown si on clique en dehors
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="about-page">
            <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-content">
                    <div className="logo">
                        GESTION DES <span>STAGES</span>
                    </div>
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <Link to="/" className="nav-link">
                                    <span className="nav-link-hover">Accueil</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="nav-link">
                                    <span className="nav-link-hover">À propos</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="nav-link">
                                    <span className="nav-link-hover">Contact</span>
                                </Link>
                            </li>
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
                                    <li><Link to="/loginAdmin">Administrateur</Link></li>
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
                        <span className="title-animation">À propos de notre plateforme</span>
                        <span className="title-emphasis">Découvrez notre mission, vision et valeurs</span>
                    </h1>
                    <p className="hero-description">
                        Apprenez-en plus sur notre engagement à faciliter la gestion des stages.
                    </p>
                </div>
            </main>

            <div className="about-container">
                <div className="about-content">
                    <h1>À propos de notre plateforme</h1>
                    <div className="about-grid">
                        <div className="about-card">
                            <h3>Notre Mission</h3>
                            <p>Faciliter la gestion des stages en connectant les entreprises, les stagiaires et les encadrants dans un environnement professionnel unique.</p>
                        </div>
                        <div className="about-card">
                            <h3>Notre Vision</h3>
                            <p>Devenir la référence en matière de gestion de stages, en offrant une expérience utilisateur optimale et des outils performants.</p>
                        </div>
                        <div className="about-card">
                            <h3>Nos Valeurs</h3>
                            <p>Excellence, innovation, collaboration et engagement envers la réussite de nos utilisateurs.</p>
                        </div>
                        <div className="about-card">
                            <h3>Notre Équipe</h3>
                            <p>Une équipe dévouée de professionnels travaillant pour vous offrir la meilleure expérience possible.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;