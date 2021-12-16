import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import Inscription from "./components/Inscription/inscription";
import Accueil from "./components/Accueil/Accueil";
import Panier from "./components/Panier/Panier";
import { UserContext } from "./components/Context/UserContext";
import Annonces from "./components/Annonces/Annonces";
import { useState } from "react";
import Details from "./components/Details/Details";

function App() {
    const [granted, setGranted] = useState(localStorage.getItem("token"));
    return (
        <UserContext.Provider value={{ granted, setGranted }}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/inscription" element={<Inscription />} />
                    <Route path="/panier" element={<Panier />} />
                    <Route path="/annonces" element={<Annonces />} />
                    <Route path="/annonces/:id" element={<Details />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
