import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Encadrant = ({ assignments }) => {
    return (
        <div className="Page-container">
            <nav className="drawer">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/Encadrant">Assignation</Link></li>
                </ul>
            </nav>
            <div className="content">
                <h1>Liste d'assignation</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email du Stagiaire</th>
                            <th>Email de l'Encadrant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(assignments).map(([stagiaireEmail, encadrantEmail], index) => (
                            <tr key={index}>
                                <td>{stagiaireEmail}</td>
                                <td>{encadrantEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

Encadrant.propTypes = {
    assignments: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Encadrant;