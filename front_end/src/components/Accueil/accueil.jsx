import React, {useEffect, useState, useContext} from "react";
import styles from './Accueil.module.css'
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext'

export default function Accueil() {
    const [annonces, setAnnonces] = useState([]);
    const navigation = useNavigate();
    const {granted} = useContext(UserContext);
    
    useEffect(() => {
        fetch("/annonce", {
            method: "GET",
            headers:{"Content-type": "application/json"}})
            .then((resultat) => resultat.json())
            .then((annonce) => {
                setAnnonces(annonce);
            })
            .catch((error) => console.log(error));
        return () => {
        }
    }, [])

    const buy = async (id) =>{
        fetch("/panier", {
            method: "POST",
            headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`},
            body: JSON.stringify({id})})
            .then((resultat) => resultat.json())
            .then((annonce) => {
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <h1>Pade d'Accueil</h1>
            {
                (annonces.length == 0) ? <Loader className={styles.load} type="Rings" /> : (
                    <div className={styles.container}>
                        {
                            annonces.map((an)=>
                            {
                                return(
                                <div key={an._id} className={styles.card}>
                                    <h3 className={styles.cat}>{an.categorie}</h3>
                                    <img src={an.photo} className={styles.image}/>
                                    <h3 className={styles.text}>{an.nom}</h3>
                                    <p className={styles.text}>{an.description}</p>
                                    <h2 className={styles.text}>Nb: {an.quantity}</h2>
                                    <h2 className={styles.price}>{an.prix}€</h2>  
                                    <div className={styles.buttons}>
                                        <button onClick={()=>{buy(an._id)}} className={styles.buy}>Buy</button>
                                        <button className={styles.details} onClick={()=> navigation(`/annonces/${an._id}`)}>Details</button>
                                    </div>  
                                </div>)
                            })
                        } 
                    </div>)
            }
        </>
        
    );
}
