import React, { useState} from "react";
import styles from './Inscription.module.css'

export default function Inscription() {
    const [lastname, setLastName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [picture, setPicture] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {nom: lastname, prenom: firstname, age: age, email: email, password: password, photoProfile: picture, annonces: [], panier: [] }

        fetch("/signup", {
        method: "POST",
        headers:{"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(user)})
        .then((resultat) => resultat.json())
        .then((posts) => {
            console.log(posts);
            const {token} = posts;
            localStorage.setItem("token",token);
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className={styles.div} >
            <h1 className={styles.text}>Page d'inscription</h1>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <input className={styles.Input} type='text' placeholder="LASTNAME" onChange={(event)=> setLastName(event.target.value)} value={lastname}/>
                <input className={styles.Input} type='text' placeholder="FIRSTNAME" onChange={(event)=> setFirstName(event.target.value)} value={firstname}/>
                <input className={styles.Input} type='number' placeholder="AGE" onChange={(event)=> setAge(event.target.value)} value={age}/>
                <input className={styles.Input} type="email" placeholder="EMAIL" onChange={(event)=> setEmail(event.target.value)} value={email}/>
                <input className={styles.Input} type="password" placeholder="PASSWORD"onChange={(event)=>setPassWord(event.target.value)} value={password} />
                <input className={styles.Input} type='text' placeholder="Picture Path " onChange={(event)=> setPicture(event.target.value)} value={picture}/>
                <input className={styles.Button} type="submit" value="Sign Up" />
            </form>
        </div>
    );
}
