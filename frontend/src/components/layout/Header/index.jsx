import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import {BsSun, BsMoon } from 'react-icons/bs'
import styles from './Header.module.css'

import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { Context } from '../../../context/userContext'


export const Header = () => {
    const {setterTheme} = useContext(Context)

    const handleTheme = () => {
        setterTheme()
    }


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
                <div className={styles.iconSetMode}>
                    <BsSun className={styles.sunIcon} onClick={handleTheme}/>
                    <BsMoon className={styles.moonIcon} />
                </div>
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