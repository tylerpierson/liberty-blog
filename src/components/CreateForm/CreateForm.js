import { useState } from 'react'

export default function CreateForm(props) {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await props.createBlog(formData, props.token)
            window.location.reload()
            // cool thing to do once there is a show page done
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        // Spread the formData in so that as you edit, the other edited fields remain in place
        // In 'e.target.name' the 'name' refers to whichever target name you are currently clicked on, i.e. "email", "password"
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create a New Blog Post, {props.user.name}</h2>
            <input placeholder="title" type="text" name="title" value={formData.title} onChange={handleChange} />
            <input placeholder="body" type="text" name="body" value={formData.body} onChange={handleChange} />
            <input type="submit" value="Create Blog" />
        </form>
    )
}