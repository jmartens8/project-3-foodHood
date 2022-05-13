import React from 'react'

export default function OptionLoginSetup(props) {

	return (
    <>
        <div>
            <button onClick={ () => props.setWelcome("login")}>
                Login
            </button>
        </div>
        <div>
            <button onClick={ () => props.setWelcome("signup")}>
                Signup
            </button>
        </div>
    </>
	)
}