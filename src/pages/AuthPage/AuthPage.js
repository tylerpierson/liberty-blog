import { useState } from 'react'
import styles from './AuthPage.module.scss'
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"

export default function AuthPage(props){
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            <button className={styles.button} onClick={() => setShowLogin(!showLogin)}>{!showLogin ? 'Already Have an Account. Click Here to Login':'New Here? Click here to Sign Up'}</button>
            {/* Pass signUp and login props into the forms so they can perform signUp and login functionality */}
            { !showLogin ? <SignUpForm signUp={props.signUp}/> : <LoginForm login={props.login}/> }
        </>
    )
}