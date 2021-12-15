import React, {  useContext } from "react";
import { NavLink} from "react-router-dom";
import styles from "./NavBar.module.css"
import { UserContext } from '../Context/UserContext'


export default function NavBar() {
    const {granted, setGranted} = useContext(UserContext);

    return (
        <nav className={styles.nav}>
            <NavLink className={styles.buttonLeft} to="/">Page d'Accueil</NavLink>
            {
                granted ? (<>
                    <NavLink className={styles.buttonRight}  to="/panier">panier</NavLink>
                    <NavLink className={styles.buttonRight}  to="/annonces">annonces</NavLink> 
                    <NavLink className={styles.buttonRight}  to="/connexion" onClick={()=>{
                        localStorage.removeItem("token");
                        setGranted("");
                    }}>deconnexion</NavLink>
                </>) :
                (<>
                    <NavLink className={styles.buttonRight}  to="/connexion">connexion</NavLink>
                    <NavLink className={styles.buttonRight}  to="/inscription">inscription</NavLink>
                </>)
            }
            
        </nav>
    );
}
