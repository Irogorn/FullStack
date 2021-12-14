//import liraries
import React, { Component, useState } from "react";

// create a component
const Connexion = () => {
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")

    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handlePassWord(event){
        setPassWord(event.target.value)
    }

    const handleSubmit = (event) => {
        alert(email + " "+password);
        event.preventDefault();
      }


    return (
        <div>
            <h1>Page de connexion</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="EMAIL" onChange={handleEmail} value={email}/>
                <input type="password" placeholder="PASSWORD"onChange={handlePassWord} value={password} />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
        
    );
};

//make this component available to the app
export default Connexion;
