import NavBar from "./components/NavBar/navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connexion from "./components/Connexion/connexion";
import Inscription from "./components/Inscription/inscription";
import Accueil from "./components/Accueil/accueil";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
            </Routes>
        </Router>
    );
}

export default App;
