import { useState } from 'react'
import styles from './SignUpForm.module.scss'

export default function SignUpForm (props){
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        // Spread the credentials in so that as you edit, the other edited fields remain in place
        // In 'e.target.name' the 'name' refers to whichever target name you are currently clicked on, i.e. "name", "email", "password"
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
        <div className={styles.container}>
            <h2 className={styles.heading}>This is the <span className={styles.span}>Sign Up</span> Form</h2>
            <form 
                className={styles.form}
                onSubmit={(e) => {
                e.preventDefault()
                props.signUp(credentials)
                window.location.reload()
            }}>
                <input className={styles.input} type='text' name='name' onChange={handleChange} value={credentials.name} placeholder='Name' />
                <input className={styles.input} type='email' name='email' onChange={handleChange} value={credentials.email} placeholder='Email' />
                <input className={styles.input} type='password' name='password' onChange={handleChange} value={credentials.password} placeholder='Password' />
                <input className={styles.button} type='submit' value='submit' />
            </form>
        </div>
        </>  
    )
}