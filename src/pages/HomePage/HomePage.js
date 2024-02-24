import { useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm' 
import Blogs from '../../components/Blogs/Blogs' 

export default function HomePage(props){
    const [blogs, setBlogs] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    // Blogs useEffect
        // Make sure we have the blog data after the user mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs()
                setBlogs(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs()
    }, [])

    // Checking the token && user in localStorage
    useEffect(() => {
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    return (
        <>
            <div>
                <h1>Welcome to the Liberty Blog</h1>
                { showCreate ? <CreateForm user={props.user} createBlog={props.createBlog} token={props.token} /> : <></> }
                { blogs.length ? <Blogs blogs={blogs} /> : 'Sorry, no blogs yet!'}
            </div>
        </>
    )
}