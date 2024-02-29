import { Link } from 'react-router-dom'
import styles from './Blogs.module.scss'

export default function Blogs(props) {
    return(<div>
        {props.blogs.map((blog) => {
            return(
            <article className={styles.article} key={blog._id}>
                <h3 className={styles.title}>{blog.title}</h3>
                <Link to={`/blog/${blog._id}`} className={styles.link}>This the link to the Show Page of {`${blog._id}`}</Link>
            </article>)
        })}
    </div>)
}