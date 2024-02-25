import { useState } from 'react'
import styles from './NavBar.module.scss'
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"

export default function NavBar(props) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [showLogin, setShowLogin] = useState(true)

    return (
        <ul className={styles.ul}>
            <a className={`${styles.a} ${styles.home}`} href='/'>
                <li className={styles.li}>Home</li>
            </a>
            <h1 className={styles.h1}>Liberty Blogs</h1>
            {!token ? (            
                <a className={`${styles.a} ${styles.login}`} href='/register'>
                    <li className={styles.li}>Login/Sign Up</li>
                </a>
            ) : (
                ''
            )}
            {token ? (
                <a className={`${styles.a} ${styles.login}`}>
                    <li
                        className={styles.li}
                        onClick={() => {
                            localStorage.removeItem('token');
                            setToken(null)
                            window.location.reload()
                        }}
                    >
                        Logout
                    </li>
                </a>
            ) : (
                ''
            )}
        </ul>
    )
}
