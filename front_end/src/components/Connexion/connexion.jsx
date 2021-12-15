//import liraries
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Connexion.module.css"
import { UserContext } from '../Context/UserContext'

// create a component
const Connexion = () => {
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const navigation = useNavigate();
    const {setGranted} = useContext(UserContext);

    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handlePassWord(event){
        setPassWord(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {email, password: password}

        //Axios must be installed.
        /*axios.post("/login",user).then((res)=> console.log(res)).catch((err) => console.log(err))*/

        fetch("/login", {
        method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify(user)})
        .then((resultat) => resultat.json())
        .then((posts) => {
            const {token} = posts;
            localStorage.setItem("token",token);
            setGranted(token);
            navigation("/");
        })
        .catch((error) => console.log(error));
    }


    return (
        <div className={styles.div}>
            <h1 className={styles.text}>Page de connexion</h1>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <input className={styles.Input} type="email" placeholder="EMAIL" onChange={handleEmail} value={email}/>
                <input className={styles.Input} type="password" placeholder="PASSWORD"onChange={handlePassWord} value={password} />
                <input className={styles.Button} type="submit" value="Sign Up" />
            </form>
        </div>
        
    );
};

//make this component available to the app
export default Connexion;
