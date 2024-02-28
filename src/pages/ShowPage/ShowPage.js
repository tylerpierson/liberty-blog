import { useState, useEffect } from 'react'
import Blog from '../../components/Blog/Blog'
import UpdateForm from '../../components/UpdateForm/UpdateForm'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function ShowPage(props){
    // display the individual blog posts --- Blog Component
    // be able to update the blog post --- Update Component
    // be able to delete the blog post --- button (not to be confused with a button component)
    const [showUpdate, setShowUpdate] = useState(false)
    const [allowChanges, setAllowChanges] = useState(false)
    const [blog, setBlog] = useState({
        title:'',
        body: '',
        user: ''
    })

    // destructure the id from the params
    const {id} = useParams() // FE version of req.params

    // navigate to other pages
    const navigateTo = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
               const data = await props.getIndividualBlog(id)
               setBlog(data) 
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlog()
    }, [])

    // Checking the token && user in localStorage
    useEffect(() => {
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    useEffect(() => {
        if(props.user){
            if(blog && props.user._id === blog.user){
            setAllowChanges(true)
        }}
    }, [props.user, blog])

    const handleDelete = async () => {
        try {
            await props.deleteBlog(id, props.token)
            navigateTo('/')
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
            <Link to={'/'}>Go to Homepage</Link>
            <h1>{blog?.title || 'Loading....'}</h1>
            <p>{blog?.body || ''}</p>
            { allowChanges?
            <button onClick={() => setShowUpdate(!showUpdate)}>Reveal Update Form</button>:
            <></>
            }
            {allowChanges && showUpdate ? <UpdateForm id={id} updateBlog={props.updateBlog} setShowUpdate={setShowUpdate} setBlog={setBlog} blog={blog} token={props.token} setToken={props.token}/> : <></>}
            {allowChanges? <button onClick={handleDelete}>Delete Blog</button>: <></>}
        </div>
    )
}