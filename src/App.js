import { useState, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar'
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
            // From the "data" response received, pull out the user object and set the user state
            setUser(data.user)
            // From the "data" response received, pull out the token object and set the token state
            setToken(data.token)
            // Store the token && user in localStorage
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            console.error(error)
        }
    }

    // This function will need to be a prop passed to the LoginForm via AuthPage
    const login = async (credentials) => {
        try {
            // https://i.imgur.com/3quZxs4.png
            // Step 1 is complete here once someone fills out the loginForm
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            // Step 3
            const tokenData = data.token
            localStorage.setItem('token', tokenData)
            // The below code is additional to the core features of authentication
            // You need to decide what additional things you would like to accomplish when you
            // set up your stuff
            const userData = data.user
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            console.error(error)
        }
    }

    // CreateBlog
    // We need token authentication in order to verify that someone can make a blog
    // Now that we have the token from the signup/login above, we will pass it into the following functions for authentication
    const createBlog = async (blogData, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    // This part is only necessary when sending data, not when retrieving it, i.e. GET requests
                    // Tell it that we're sending JSON data
                    'Content-Type': 'application/json',
                    // Tell it that we have a user token
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    // ReadBlog - we don't need authentication
    const getAllBlogs = async () => {
        try {
            const response = await fetch('/api/blogs')
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)            
        }
    }

    // Show and individual blog - no need for authentication
    const getIndividualBlog = async (id) => {
        try {
            const response = await fetch(`/api/blogs/${id}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    // UpdateBlog
    const updateBlog = async (newBlogData, id, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    // This part is only necessary when sending data, not when retrieving it, i.e. GET requests
                    // Tell it that we're sending JSON data
                    'Content-Type': 'application/json',
                    // Tell it that we have a user token
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newBlogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    // DeleteBlog
    const deleteBlog = async (id, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    // Don't need content-type because we are not sending any data
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.App}>
            <NavBar />
            <Routes>
                {/* What is needed on this page:
                    Get all Blog posts when the component mounts 
                    Create an individual Blog post
                 */}
                <Route path='/' 
                element={<HomePage 
                // Pass user, token, && setToken props down to HomePage
                    user={user} 
                    token={token} 
                    // nameOfTheProp={nameOfTheFunction}
                    setToken={setToken}
                    setUser={setUser}
                    createBlog={createBlog}
                    getAllBlogs={getAllBlogs}
                />}></Route>

                {/* What is needed on this page:
                    User needs to be able to signUp
                    User needs to be able to Login
                */}
                <Route path='/register' 
                element={<AuthPage 
                // Pass setUser, setToken && signUp props down to AuthPage
                    setUser={setUser}
                    setToken={setToken}
                    signUp={signUp}
                    login={login}
                />}></Route>

                {/* What is needed on this page:
                    Be able to GET an individual blog
                    Be able to UPDATE blog
                    Be able to DELETE blog
                */}
                <Route path='/blog' 
                element={<ShowPage 
                // Pass user, token, && setToken props down to HomePage
                    user={user} 
                    token={token} 
                    setToken={setToken}
                    getIndividualBlog={getIndividualBlog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                />}></Route>
            </Routes>
            {
            token ?
            <button 
            className={styles.button}
            onClick={() => {
                localStorage.removeItem('token')
                window.location.reload()
            }}>
                Logout
            </button>:
            ''
            }
        </div>
    )
}