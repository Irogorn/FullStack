import React, { useState } from "react";

export default function Inscription() {
    const [lastname, setLastName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [picture, setPicture] = useState("")

    const handleSubmit = (event) => {
        alert(email + " "+password);
        event.preventDefault();
    }
    
    return (
        <div>
        <h1>Page d'inscription</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="LASTNAME" onChange={(event)=> setLastName(event.target.value)} value={lastname}/>
            <input type='text' placeholder="FIRSTNAME" onChange={(event)=> setFirstName(event.target.value)} value={firstname}/>
            <input type='number' placeholder="AGE" onChange={(event)=> setAge(event.target.value)} value={age}/>
            <input type="email" placeholder="EMAIL" onChange={(event)=> setEmail(event.target.value)} value={email}/>
            <input type="password" placeholder="PASSWORD"onChange={(event)=>setPassWord(event.target.value)} value={password} />
            <input type='text' placeholder="Picture Path " onChange={(event)=> setPicture(event.target.value)} value={picture}/>
            <input type="submit" value="Sign Up" />
        </form>
    </div>
    );
}
