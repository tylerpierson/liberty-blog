import { useState } from 'react'
import styles from './LoginForm.module.scss'

export default function LoginForm (props){
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        // Spread the credentials in so that as you edit, the other edited fields remain in place
        // In 'e.target.name' the 'name' refers to whichever target name you are currently clicked on, i.e. "email", "password"
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h2 className={styles.heading}>This is the Login Form</h2>
            <form 
                className={styles.form}
                onSubmit={(e) => {
                e.preventDefault()
                props.login(credentials)
            }}>
                <input type='email' name='email' onChange={handleChange} value={credentials.email} placeholder='Email' />
                <input type='password' name='password' onChange={handleChange} value={credentials.password} placeholder='Password' />
                <input type='submit' value='submit' />
            </form>
        </>  
    )
}