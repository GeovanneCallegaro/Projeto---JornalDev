import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import styles from './Header.module.css'

import { Link } from 'react-router-dom'


export const Header = () => {
    return (
        <>
        <header className={styles.headerContainer} id="idTop">
            <div className={styles.socialMediaContainer}>
                <div className={styles.socialMediaIcon}><FaFacebookF /></div>
                <div className={styles.socialMediaIcon}><FaTwitter /></div>
                <div className={styles.socialMediaIcon}><FaInstagram /></div>
                <div className={styles.socialMediaIcon}><FaGithub /></div>
            </div>
            <div className={styles.titleContainer}>
                <h1>LOGO</h1>
                <Link to="/users/login"><button>Login</button></Link>
            </div>
        </header>
        <section className={styles.menuSection} >
            <div className={styles.menuSectionItem}>
                <p>Assine! Primeiro mês com gratuidade</p>
                <p>Futebol</p>
                <p>Moda</p>
                <p>Tecnologia</p>
                <p>Mundo</p>
            </div>
        </section>
        </>
    )
}