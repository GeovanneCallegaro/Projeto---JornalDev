import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

import styles from './Header.module.css'

import { Link } from 'react-router-dom'

import { useContext} from 'react'
import { Context } from '../../../context/userContext'



export const Header = ({user}) => {
    const {authenticated, logout} = useContext(Context)

    const handleMenuMobile = () => {
        const headerContainer = document.querySelector('#idTop')
        const menuMobileSection = document.querySelector('.Header_menuMobileSection__UZa4e')

        headerContainer.style.display = 'none'
        menuMobileSection.style.display = 'flex'
    }

    const closeMenuMobile = () => {
        const headerContainer = document.querySelector('#idTop')
        const menuMobileSection = document.querySelector('.Header_menuMobileSection__UZa4e')

        headerContainer.style.display = 'flex'
        menuMobileSection.style.display = 'none'
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
            </div>
            <div>
                <AiOutlineMenu className={styles.iconMenuMobile} onClick={handleMenuMobile}></AiOutlineMenu>
            </div>
            <aside className={styles.menuContainer}>
                <div className={styles.menuDivContainer}>
                    <ul>
                        {authenticated === true && user.admin === 'Sim' ? (
                            <>
                                <li><Link to="users/profile">Editar meus dados</Link></li>
                                <li><Link to="admin/dashboard">Dashboard</Link></li>
                                <li onClick={logout} className={styles.logout}>Sair</li>
                            </>
                        ) : (
                            <>
                                {authenticated === true && user.occupation === 'escritor' ? (
                                    <>
                                        <li><Link to="users/profile">Editar meus dados</Link></li>
                                        <li><Link to="posts/createpost">Criar posts</Link></li>
                                        <li><Link to="posts/myposts">Meus posts</Link></li>
                                        <li onClick={logout} className={styles.logout}>Sair</li>
                                    </>
                                ) : (
                                    <>
                                        {authenticated === true ? (
                                            <>
                                                <li><Link to="users/profile">Editar meus dados</Link></li>
                                                <li onClick={logout} className={styles.logout}>Sair</li>
                                            </>
                                        ): (
                                            <>
                                                <li><Link to="users/login">Login</Link></li>
                                                <li><Link to="users/register">Registre-se</Link></li>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </aside>
        </header>
        
        <section className={styles.menuMobileSection}>
            <div className={styles.menuMobileDiv}>
                    <ul>
                        {authenticated === true && user.admin === 'Sim' ? (
                            <>
                                <li><Link to="users/profile">Editar meus dados!</Link></li>
                                <li><Link to="admin/dashboard">Dashboard</Link></li>
                                <li onClick={logout}>Sair</li>
                            </>
                        ) : (
                            <>
                                {authenticated === true && user.occupation === 'escritor' ? (
                                    <>
                                        <li><Link to="users/profile">Editar meus dados</Link></li>
                                        <li><Link to="posts/createpost">Criar posts</Link></li>
                                        <li><Link to="posts/myposts">Meus posts</Link></li>
                                        <li onClick={logout}>Sair</li>
                                    </>
                                ) : (
                                    <>
                                        {authenticated === true ? (
                                            <>
                                                <li><Link to="users/profile">Editar meus dados</Link></li>
                                                <li onClick={logout}>Sair</li>
                                            </>
                                        ): (
                                            <>
                                                <li><Link to="users/login">Login</Link></li>
                                                <li><Link to="users/register">Registre-se</Link></li>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        <AiOutlineClose className={styles.closeMenuMobile} onClick={closeMenuMobile}></AiOutlineClose>
                    </ul>
            </div>
        </section>
        </>
    )
}