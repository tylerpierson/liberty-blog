import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
    // Default state for user is null
    // Default state for token is an empty string
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    // Create a signUp fn that connects to the backend
    const signUp = async(credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                // Headers that will be set in PostMan
                headers: {
                    'Content-Type': 'application/json'
                },
                // Turn the body into a readable JavaScript object 
                body: JSON.stringify(credentials)
            })
            // Turn response back into a JavaScript object
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            // Store the item in localStorage
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.App}>
            <Routes>
                <Route path='/' element={<HomePage 
                // Pass user, token, && setToken props down to HomePage
                    user={user} 
                    token={token} 
                    setToken={setToken}
                />}></Route>
                <Route path='/register' element={<AuthPage 
                // Pass setUser, setToken && signUp props down to AuthPage
                    setUser={setUser}
                    setToken={setToken}
                    signUp={signUp}
                />}></Route>
                <Route path='/blog' element={<ShowPage 
                // Pass user, token, && setToken props down to HomePage
                    user={user} 
                    token={token} 
                    setToken={setToken}
                />}></Route>
            </Routes>
        </div>
    )
}