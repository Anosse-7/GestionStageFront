import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Encadrant = ({ assignments }) => {
    return (
        <div className="Page-container">
            <nav className="drawer" style={{ width: '267px', backgroundColor: '#4b4033' }}>
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
                                <td>{stagiaireEmail || 'N/A'}</td>
                                <td>{encadrantEmail || 'N/A'}</td>
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

const EncadrantPage = () => {
    const [assignments, setAssignments] = useState({});

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/stagiaire/consulterEncadrant', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const { stagiaire, encadrant } = response.data;
                setAssignments({ [stagiaire.email]: encadrant ? encadrant.email : 'N/A' });
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    return <Encadrant assignments={assignments} />;
};

export default EncadrantPage;