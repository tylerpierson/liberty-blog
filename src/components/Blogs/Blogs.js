import { Link } from 'react-router-dom'
import styles from './Blogs.module.scss'

export default function Blogs(props) {
    return(<div>
        {props.blogs.map((blog) => {
            return(
            <article className={styles.article} key={blog._id}>
                <Link to={`/blog/${blog._id}`} className={styles.link}><h3 className={styles.title}>{blog.title}</h3></Link>
                <p className={styles.p}>{blog.body}</p>
            </article>)
        })}
    </div>)
}