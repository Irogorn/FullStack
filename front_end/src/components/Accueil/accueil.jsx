import React, {useEffect, useState, useContext} from "react";
import styles from './Accueil.module.css'
import Loader from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from '../Context/UserContext'

export default function Accueil() {
    const [paramsUrl, setParamsUrl] = useSearchParams();
    const [annonces, setAnnonces] = useState([]);
    const navigation = useNavigate();
    const {granted} = useContext(UserContext);
    const [word,setWord] = useState(paramsUrl.get("nom") === null ? "" : paramsUrl.get("nom"));
    const [category,setCategory] = useState(paramsUrl.get("categorie") === null ? "" : paramsUrl.get("categorie"));
    const [priceMax,setPriceMax] = useState(false);
    const [priceMin,setPriceMin] = useState(true);
    const [order,setOrder] = useState(paramsUrl.get("direction") === null ? 'ASC' : paramsUrl.get("direction"));
    const [find,setFind] = useState(false);

    useEffect(() => {   
        setParamsUrl(`?nom=${word}&direction=${order}&categorie=${category}`);
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
    }, [find])

    const buy = async (id) =>{
        console.log("BUY");
        fetch("/panier", {
            method: "POST",
            headers:{"Content-type": "application/json", "Authorization":`Bearer ${granted}`},
            body: JSON.stringify({id})})
            .then((resultat) => resultat.json())
            .then((annonce) => {
            })
            .catch((error) => console.log(error));
    }

    const handleWord = (event) => {
            if(event.target.value.length === 0){
                setFind(!find);
                setWord("");
            }
            else{
                setWord(event.target.value);
            }
    }

    const  handleCategory = (event) =>
    {
        setCategory(event.target.value)
        setFind(!find);
    }
    
    function handleMax(){
        setPriceMax(!priceMax);
        setPriceMin(!priceMin);
        setOrder('DESC');
        setFind(!find);
    }

    function handleMin(){
        setPriceMax(!priceMax);
        setPriceMin(!priceMin);
        setOrder('ASC');
        setFind(!find);
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
                    <select className={styles.category} value={category} onChange={handleCategory}>
                        <option value=''>Catégories</option>
                        <option value='Hifi'>HiFi</option>
                        <option value='Cloth'>Cloth</option>
                    </select>
                    <button className={styles.button} onClick={()=> setFind(!find)}>Search</button>
                </div>
                
            </div>
            <h1>Pade d'Accueil</h1>
            {
                (annonces.length === 0) ? <Loader className={styles.load} type="Rings" /> : (
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
