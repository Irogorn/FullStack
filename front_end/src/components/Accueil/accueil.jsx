import React, {useEffect, useState, useContext} from "react";
import styles from './Accueil.module.css'
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext'

export default function Accueil() {
    const [annonces, setAnnonces] = useState([]);
    const navigation = useNavigate();
    const {granted} = useContext(UserContext);
    const [word,setWord] = useState("");
    const [category,setCategory] = useState("");
    const [priceMax,setPriceMax] = useState(false);
    const [priceMin,setPriceMin] = useState(true);
    const [order,setOrder] = useState('ASC');
    const [find,setFind] = useState(false);

    useEffect(() => {
        fetch(`/annonce?nom=${word}&direction=${order}&categorie=${category}`, {
            method: "GET",
            headers:{"Content-type": "application/json"}})
            .then((resultat) => resultat.json())
            .then((annonce) => {
                setAnnonces(annonce);
            })
            .catch((error) => console.log(error));
        return () => {
        }
    }, [category,order,find])

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

    function handleWord(event){
        setWord(event.target.value)
    }
    
    function handleMax(){
        setPriceMax(!priceMax);
        setPriceMin(!priceMin);
        setOrder('DESC');
    }

    function handleMin(){
        setPriceMax(!priceMax);
        setPriceMin(!priceMin);
        setOrder('ASC');
    }

    return (
        <>
            <div className={styles.search}>
                <input className={styles.word}  type="search" placeholder="Search" onChange={handleWord} value={word}/>
                <div className={styles.options}>
                    <label>
                        <input type="checkbox" checked={priceMax} onChange={handleMax}/>
                        Prix décroissant
                    </label>
                    <label>
                        <input type="checkbox" checked={priceMin} onChange={handleMin}/>
                        Prix croissant
                    </label>
                    <select className={styles.category} value={category} onChange={(event)=>setCategory(event.target.value)}>
                    <option value=''>Catégories</option>
                        <option value='Hifi'>HiFi</option>
                        <option value='Cloth'>Cloth</option>
                    </select>
                    <button className={styles.button} onClick={()=> setFind(!find)}>Search</button>
                </div>
                
            </div>
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
