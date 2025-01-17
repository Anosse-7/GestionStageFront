import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginRH from './Rh/LoginRh';
import LoginCandidat from './Candidat/LoginCandidat';
import LoginEncadrant from './Encadrant/LoginEncadrant';
import LoginStagiaires from './Stagiaires/LoginStagiaires';
import DemandsPage from './Rh/DemandsPage';
import AcceptedDemandsPage from './Rh/AcceptedDemandsPage';
import RefusedDemandsPage from './Rh/RefusedDemandsPage';
import PageStages from './Rh/PageStages';
import Candidatures from './Candidat/Candidatures';
import AdminPage from './Admin/AdminPage';
import RHComptes from './Admin/RhComptes';
import EncadrantsComptes from './Admin/EncadrantsComptes';
import StagiairesComptes from './Admin/StagiairesComptes';
import AssignEncadrant from './Rh/AssignEncadrant'; // Ajout du nouveau composant
import SupervisorPage from './Encadrant/SupervisorPage';
import Encadrant from './Stagiaires/Encadrant'; // Ajout du nouveau composant
import Contact from './Contact';
import About from './About';
import LoginAdmin from './Admin/LoginAdmin';

const App = () => {
    const [accounts, setAccounts] = useState([]); // Gestion des comptes
    const [demands, setDemands] = useState([]); // Gestion des demandes
    const [acceptedDemands, setAcceptedDemands] = useState([]); // Gestion des demandes acceptées
    const [rejectedDemands] = useState([]); // Gestion des demandes refusées
    const [stagiaires, setStagiaires] = useState([]); // Gestion dynamique des stagiaires
    const [assignments, setAssignments] = useState({}); // Gestion des assignations

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-rh" element={<LoginRH />} />
                <Route path="/LoginCandidat" element={<LoginCandidat />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/About" element={<About />} />



                <Route path="/LoginEncadrant" element={<LoginEncadrant />} />

                <Route path="/loginAdmin" element={<LoginAdmin />} />
                <Route path="/loginStagiaires" element={<LoginStagiaires />} />
                <Route
                    path="/DemandsPage"
                    element={
                        <DemandsPage
                            demands={demands}
                            setDemands={setDemands}
                            setAcceptedDemands={setAcceptedDemands}
                        />
                    }
                />
                <Route
                    path="/accepted"
                    element={<AcceptedDemandsPage acceptedDemands={acceptedDemands} />}
                />
                <Route
                    path="/refused"
                    element={<RefusedDemandsPage rejectedDemands={rejectedDemands} />}
                />
                <Route
                    path="/stages"
                    element={<PageStages stagiaires={stagiaires} />}
                />
                <Route
                    path="/Candidatures"
                    element={<Candidatures demands={demands} setDemands={setDemands} />}
                />
                <Route
                    path="/AdminPage"
                    element={<AdminPage accounts={accounts} setAccounts={setAccounts} />}
                />
                <Route path="/RHComptes" element={<RHComptes accounts={accounts} />} />
                <Route path="/StagiairesComptes" element={<StagiairesComptes accounts={accounts} />} />
                <Route path="/EncadrantsComptes" element={<EncadrantsComptes accounts={accounts} />} />
                <Route
                    path="/AssignEncadrant"
                    element={<AssignEncadrant accounts={accounts} assignments={assignments} setAssignments={setAssignments} />} // Nouveau chemin
                />
                <Route
                    path="/SupervisorPage"
                    element={<SupervisorPage stagiaires={stagiaires} setStagiaires={setStagiaires} />}
                />
                <Route
                    path="/Encadrant"
                    element={<Encadrant assignments={assignments} />} // Nouveau chemin
                />


            </Routes>
        </Router>
    );
};

export default App;