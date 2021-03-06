import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from './Details.module.css'
import { useNavigate } from "react-router-dom";

export default function Details() {
    const [details,setDetails] = useState({});
    const {id} = useParams();
    const navigation = useNavigate();

    useEffect(() => {
        fetch(`/annonce/${id}`, {
            method: "GET"})
            .then((resultat) => resultat.json())
            .then((details) => {
                setDetails(details);
            })
            .catch((error) => console.log(error));
        return () => {
            
        }
    }, [id])
    
    return (
        <div>
            <h1 style={{paddingLeft: '20px'}}>Details</h1>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h3 className={styles.cat}>{details.categorie}</h3>
                    <img src={details.photo} className={styles.image}/>
                    <h3 className={styles.text}>{details.nom}</h3>
                    <p className={styles.text}>{details.description}</p>
                    <h2 className={styles.text}>{details.quantity}</h2>
                    <h2 className={styles.price}>{details.prix}</h2>    
                    <button className={styles.back} onClick={()=>{navigation('/')}}>Back</button>
                </div>
                
            </div>
        </div>
    )
}
