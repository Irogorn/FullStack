import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import styles from './Annonces.module.css'

export default function Annonces() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState()
    const [descrip, setDescrip] = useState("")
    const [picture, setPicture] = useState("")
    const [category, setCategory] = useState("Hifi")
    const [quantity, setQuantity] = useState()
    const [annonceId, setAnnonceId] = useState("0")
    const {granted} = useContext(UserContext);
    const [toggle,setToggle] = useState(false);
    const [listID, setListId] = useState([]);
    const [listUserAnnonce, setListUserAnnonce] = useState([]);

    const handle = (event) => {
        event.preventDefault();
        const annonce = {nom: name, prix: price, description: descrip, photo: picture, categorie: category, quantity}

        fetch("/annonce", {
            method: "POST",
            headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`},
            body: JSON.stringify(annonce)})
            .then((resultat) => resultat.json())
            .then((annonce) => {
                setListUserAnnonce(prev=>[annonce,...prev])
            })
            .catch((error) =>console.log(error));
    };

    useEffect(() => {
        fetch("/user/annonces", {
            method: "GET",
            headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`}})
            .then((resultat) =>resultat.json())
            .then((list) => {
                setListId(list)
            })
            .catch((error) => console.log(error));
        return () => {
        }
    }, [granted]);

    useEffect(() => {
        (listID.length > 0)&&(listID.forEach((id)=>{
            fetch(`/annonce/${id}`)
                .then((resultat) =>  resultat.json())
                .then((annonce) => {
                    setListUserAnnonce((prev)=>[annonce, ...prev])
                })
                .catch((error) => console.log(error));
        }))
        return () => {
            
        }
    }, [listID]);

    const deleteAnnonce = (id) => {
        fetch(`/annonce/${id}`,
            {method: 'DELETE',
            headers:{"Authorization":`Bearer ${granted}`}})
        .then((resultat) =>  resultat.json())
        .then(() => {
            setListUserAnnonce(listUserAnnonce.filter((annonce)=> annonce._id !== id))
        })
        .catch((error) => console.log(error));
    };

    const updateAnnonce = (annonce)=>{
        setToggle(true);
        setName(annonce.nom)
        setDescrip(annonce.description)
        setPrice(annonce.prix)
        setCategory(annonce.categorie)
        setPicture(annonce.photo)
        setAnnonceId(annonce._id)
        setQuantity(annonce.quantity)
    };

    const update = (event) =>{
        event.preventDefault();
        if(annonceId !== ""){
            console.log(typeof(price));
            const annonce = {nom: name, prix: price, description: descrip, photo: picture, categorie: category, quantity}

            fetch(`/annonce/${annonceId}`, {
                method: "PATCH",
                headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`},
                body: JSON.stringify(annonce)})
                .then((resultat) => resultat.json())
                .then((annonce) => {
                    const newList = listUserAnnonce.filter((annonce) => annonce._id !== annonceId)
                    setListUserAnnonce(newList)
                    setListUserAnnonce(prev=>[annonce,...prev])
                    setToggle(false);
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <>
            <div className={styles.centerButton}>
                {
                    granted && <button className={styles.toggle} onClick={()=> setToggle((prev)=> !prev)}>Ajouter une annonce</button>
                } 
            </div>
            {
                toggle && (<div className={styles.div}>
                    <h1 className={styles.text}>Ajout d'une annonce</h1>
                    <form className={styles.Form} onSubmit={handle}>
                        <input className={styles.Input} type='text' placeholder='Name' value={name} onChange={(event)=>setName(event.target.value)}/>
                        <input className={styles.Input} type='number' placeholder='Price' value={price} onChange={(event)=> setPrice(event.target.value)}/>
                        <input className={styles.Input} type='text' placeholder='Description' value={descrip} onChange={(event)=> setDescrip(event.target.value)}/>
                        <input className={styles.Input} type='text' placeholder='Path' value={picture} onChange={(event)=> setPicture(event.target.value)}/>
                        <select className={styles.Input} value={category} onChange={(event)=> setCategory(event.target.value)}>
                            <option value='HiFi'>HiFi</option>
                            <option value='Cloth'>Cloth</option>
                        </select>
                        <input className={styles.Input} type='number' placeholder='Quantity' value={quantity} onChange={(event)=> setQuantity(event.target.value)}/>
                        <div className={styles.buttons}>
                        <input className={styles.Button} type='submit' value='ADD'/>
                        <button className={styles.Button} onClick={update}>UpDate</button>
                        </div>
                    </form>
                </div>)
            }
            
            {
                (listUserAnnonce.length > 0 )&&(listUserAnnonce.map((annonce)=>{
                    console.log(listUserAnnonce);
                    return(
                        <div className={styles.div} key={annonce._id}>
                            <h1 className={styles.text}>{annonce.nom}</h1>
                            <p className={styles.text}>{annonce.prix}€</p>
                            <p className={styles.text}>{annonce.description}</p>
                            <div  className={styles.buttons}>
                                <button className={styles.delete} onClick={()=>{deleteAnnonce(annonce._id)}}>Delete</button>
                                <button className={styles.update} onClick={()=>{updateAnnonce(annonce)}}>UpDate</button>
                            </div>
                            
                        </div>
                    )
                }))
            }
            
        </>
        
    )
}
