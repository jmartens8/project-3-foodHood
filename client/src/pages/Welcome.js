import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import Signup from '../components/WelcomeComp/Signup'
import Login from '../components/WelcomeComp/Login'
import OptionLoginSetup from '../components/WelcomeComp/OptionLoginSignup'

// import { AuthContext } from '../context/auth'

export default function Welcome() {

    const [welcome, setWelcome] = useState("")
    console.log("state", welcome);

    let displayOptions = ""

    if (welcome === ""){
        displayOptions = <OptionLoginSetup setWelcome={setWelcome}/>
    }
    if (welcome === "login"){
        displayOptions = <Login setWelcome={setWelcome}/>
    }
    if (welcome === "signup"){
        displayOptions = <Signup setWelcome={setWelcome}/>
    }
    

	return (
    <>
        <div>
            <h1>Welcome to food Hood</h1>
            <p>We are a local community to share food in order to minimize waste</p>
            <div>
                {displayOptions}
            </div>
        </div>
    </>
	)
}