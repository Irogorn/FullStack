import React, {useEffect, useState} from "react";
import styles from './Accueil.module.css'
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
    const [annonces, setAnnonces] = useState([]);
    const navigation = useNavigate();
    
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
                                    <h2 className={styles.text}>{an.quantity}</h2>
                                    <h2 className={styles.price}>{an.prix}</h2>  
                                    <div className={styles.buttons}>
                                        <button className={styles.buy}>Buy</button>
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
