// Home.js
import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
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
        <div className="home">
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
                                    <li><Link to="/LoginAdmin">Administrateur</Link></li>
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
                        <span className="title-animation">Plateforme de</span>
                        <span className="title-emphasis">Gestion des Stages</span>
                    </h1>
                    <p className="hero-description">
                        Simplifiez la gestion de vos stages et connectez-vous avec les meilleurs talents
                    </p>
                    <div className="hero-buttons">
                       
                        <Link to="/about" className="btn-secondary">
                            En savoir plus
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
