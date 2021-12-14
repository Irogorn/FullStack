import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <NavLink to="/">Pade d'Accueil</NavLink>
            <NavLink to="/connexion">connexion</NavLink>
            <NavLink to="/inscription">inscription</NavLink>
        </nav>
    );
}
