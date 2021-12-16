import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import styles from './Annonces.module.css'

export default function Annonces() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [descrip, setDescrip] = useState("")
    const [picture, setPicture] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState(0)
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
                //console.log(annonce);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetch("/user/annonces", {
            method: "GET",
            headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`}})
            .then((resultat) => resultat.json())
            .then((list) => {
                setListId(list)
            })
            .catch((error) => console.log(error));
        return () => {
        }
    }, [granted])

    useEffect(() => {
        listID.forEach((id)=>{
            fetch(`/annonce/${id}`)
                .then((resultat) =>  resultat.json())
                .then((annonce) => {
                    setListUserAnnonce(annonce)
                })
                .catch((error) => console.log(error));
        })
        return () => {
            
        }
    }, [listID])
        


    return (
        <>
            <button onClick={()=> setToggle((prev)=> !prev)}>Ajouter une annonce</button>
            {
                toggle && (<div className={styles.div}>
                    <h1 className={styles.text}>Ajout d'une annonce</h1>
                    <form className={styles.Form} onSubmit={handle}>
                        <input className={styles.Input} type='text' placeholder='Name' value={name} onChange={(event)=>setName(event.target.value)}/>
                        <input className={styles.Input} type='number' placeholder='Price' value={price} onChange={(event)=> setPrice(event.target.value)}/>
                        <input className={styles.Input} type='text' placeholder='Description' value={descrip} onChange={(event)=> setDescrip(event.target.value)}/>
                        <input className={styles.Input} type='text' placeholder='Path' value={picture} onChange={(event)=> setPicture(event.target.value)}/>
                        <select className={styles.Input} value={category} onChange={(event)=> setCategory(event.target.value)}>
                            <option value='hifi'>HiFi</option>
                            <option value='cloth'>Cloth</option>
                        </select>
                        <input className={styles.Input} type='number' placeholder='Quantity' value={quantity} onChange={(event)=> setQuantity(event.target.value)}/>
                        <input className={styles.Button} type='submit' value='ADD'/>
                    </form>
                </div>)
            }
            
            {
              console.log(listUserAnnonce)
            }
            
        </>
        
    )
}
