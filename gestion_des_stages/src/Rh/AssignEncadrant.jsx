import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignEncadrant.css';

const AssignEncadrant = () => {
    const [assignments, setAssignments] = useState({});
    const [stagiairesAccounts, setStagiairesAccounts] = useState([]);
    const [encadrantAccounts, setEncadrantAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }

            try {
                const [stagiairesResponse, encadrantsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/rh/stagiaires', {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include the token in the request headers
                        }
                    }),
                    axios.get('http://localhost:8080/api/rh/encadrants', {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include the token in the request headers
                        }
                    })
                ]);

                if (stagiairesResponse.status === 200 && encadrantsResponse.status === 200) {
                    const filteredStagiaires = stagiairesResponse.data || [];
                    const filteredEncadrants = encadrantsResponse.data || [];

                    const initialAssignments = {};
                    filteredStagiaires.forEach(stagiaire => {
                        initialAssignments[stagiaire.email] = '';
                    });

                    setStagiairesAccounts(filteredStagiaires);
                    setEncadrantAccounts(filteredEncadrants);
                    setAssignments(initialAssignments);

                    console.log('Fetched stagiaires:', filteredStagiaires); // Log the fetched stagiaires
                    console.log('Fetched encadrants:', filteredEncadrants); // Log the fetched encadrants
                } else {
                    console.error('Failed to fetch accounts');
                }
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleAssign = async (stagiaireEmail, encadrantEmail) => {
        const stagiaire = stagiairesAccounts.find(account => account.email === stagiaireEmail);
        const encadrant = encadrantAccounts.find(account => account.email === encadrantEmail);

        if (stagiaire && encadrant) {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await axios.put('http://localhost:8080/api/rh/assignEncadrant', null, {
                    params: {
                        stagiaireId: stagiaire.id,
                        encadrantId: encadrant.id,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    }
                });

                if (response.status === 200) {
                    setAssignments(prev => ({
                        ...prev,
                        [stagiaireEmail]: encadrantEmail,
                    }));
                    alert(`Encadrant ${encadrantEmail} has been assigned to Stagiaire ${stagiaireEmail}`);
                } else {
                    alert('Failed to assign encadrant');
                }
            } catch (error) {
                console.error('Error assigning encadrant:', error);
                alert('An error occurred while assigning the encadrant');
            }
        } else {
            alert('Invalid stagiaire or encadrant email');
        }
    };

    return (
        <div className="Page-container">
            <nav className="drawer" style={{ width: '267px', backgroundColor: '#4b4033' }}>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/DemandsPage">Demandes</a></li>
                    <li><a href="/accepted">Demandes acceptées</a></li>
                    <li><a href="/refused">Demandes refusées</a></li>
                    <li><a href="/stages">Stages</a></li>
                    <li><a href="/AssignEncadrant">Assignation</a></li>
                </ul>
            </nav>
            <div className="content" style={{ backgroundImage: 'linear-gradient(to right, #F5DEB3)' }}>
                <h1>Assignation d'Encadrants aux Stagiaires</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email du Stagiaire</th>
                            <th>Encadrant Assigné</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagiairesAccounts.map((stagiaire, index) => (
                            <tr key={index}>
                                <td>{stagiaire.email}</td>
                                <td>
                                    <select
                                        onChange={(e) =>
                                            handleAssign(stagiaire.email, e.target.value)
                                        }
                                        value={assignments[stagiaire.email] || ""}
                                    >
                                        <option value="" disabled>
                                            Choisir un encadrant
                                        </option>
                                        {Array.isArray(encadrantAccounts) && encadrantAccounts.map((encadrant, idx) => (
                                            <option key={idx} value={encadrant.email}>
                                                {encadrant.email}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignEncadrant;