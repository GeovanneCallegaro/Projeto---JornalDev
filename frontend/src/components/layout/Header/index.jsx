import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import {HiMenu} from 'react-icons/hi'

import styles from './Header.module.css'
import mainStyle from '../../MainPosts/MainPosts.module.css'

import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { Context } from '../../../context/userContext'



export const Header = () => {
    const {authenticated} = useContext(Context)

    const handleMenu = () => {
        const container = document.querySelector('.MainPosts_containerUserAuthenticated__T8Jwc')
        const mainPosts = document.querySelector('.MainPosts_mainSectionPosts__6d8OB')
        const mainPostItem = document.querySelector('.MainPosts_postItem__2Bb1V')
        


        if(container.style.display !== 'block') {
            container.style.display = 'block'
            mainPosts.style.marginLeft = '590px'
            mainPosts.style.width = '600px'
            mainPostItem.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))'
        } else {
            container.style.display = 'none'
            mainPosts.style.width = '800px'
            mainPosts.style.margin = '0 auto'
            mainPostItem.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))'
        }
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
                {authenticated ? (
                    <>
                        <h1>LOGO</h1>
                    </>
                ) : (
                    <>
                        <h1>LOGO</h1>
                        <Link to="/users/login"><button>Login</button></Link>
                    </>
                )}
            </div>
            <div>
            {authenticated ? (
                    <>
                        <HiMenu className={styles.iconMenuAuthenticated} onClick={handleMenu}></HiMenu> 
                    </>
                ) : (
                    <></>
                )}
            </div>
        </header>
        </>
    )
}