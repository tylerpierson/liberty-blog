import { useState } from 'react'

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
        <form onSubmit={(e) => {
            e.preventDefault()
            props.signUp(credentials)
        }}>
            <input type='text' name='name' onChange={handleChange} value={credentials.name} placeholder='Name' />
            <input type='email' name='email' onChange={handleChange} value={credentials.email} placeholder='Email' />
            <input type='password' name='password' onChange={handleChange} value={credentials.password} placeholder='Password' />
            <input type='submit' value='submit' />
        </form>
    )
}