import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'

export default function Panier() {
    const [annonceId, setAnnonceId] = useState([]);
    const [panier, setPanier] = useState([]);
    const {granted} = useContext(UserContext);

    useEffect(() => {
        fetch("/panier", {
            method: "GET",
            headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`},
            })
            .then((resultat) => resultat.json())
            .then((annonceiD) => {
                console.log(annonceiD);
                setAnnonceId(annonceiD)
            })
            .catch((error) => console.log(error));
        return () => {
        }
    }, [granted])

    useEffect(() => {
        console.log(annonceId.length > 0);
        (annonceId.length > 0)&&(annonceId.forEach((id)=>{
            fetch(`/annonce/${id}`)
                .then((resultat) =>  resultat.json())
                .then((annonce) => {
                    setPanier((pre)=>[annonce,...pre])
                })
                .catch((error) => console.log(error));
        }))
        return () => {
            
        }
    }, [annonceId]);

    const supprimerPanier = (id)=>{
        fetch(`/panier/${id}`, {
            method: "DELETE",
            headers:{"Authorization":`Bearer ${granted}`},
            })
            .then((resultat) => resultat.json())
            .then(() => {
                const newList = panier.filter((annonce)=> annonce._id != id)
                setPanier(newList)
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <h1>Panier</h1>
            {
                (panier > 0 )&&(panier.map(annonce => {
                    return(<div key={annonce._id}>
                        <h1>{annonce.nom}</h1>
                        <p>{annonce.prix}</p>
                        <p>{annonce.description}</p>
                        <button onClick={()=>{supprimerPanier(annonce._id)}}>Delete</button>
                    </div>)
                }))
            }
        </>

    )
}