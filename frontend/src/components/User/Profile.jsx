import {useFlashMessage} from '../../hooks/useFlashMessage'

import styles from './Profile.module.css'

import {Link} from 'react-router-dom'

import {AiOutlineArrowLeft} from 'react-icons/ai'

import {Footer} from '../layout/Footer/index'

export const Profile = () => {
    return (
        <>
            <header className={styles.headerContainer}>
                <Link to="/"><AiOutlineArrowLeft className={styles.iconHeader}/></Link>
                <h1>LOGO</h1>
            </header>
            <div className={styles.formContainer}>
                <div className={styles.formArea}>
                    <h2>EDITE SEUS DADOS</h2>
                    <form>
                        <input type="text" placeholder='Nome'/>
                        <input type="number" placeholder='Idade'/>
                        <input type="email" placeholder='Email'/>
                        <input type="password" placeholder='Senha'/>
                        <input type="password" placeholder='Confirmação de senha'/>
                        <input type="submit" value="Editar" className={styles.buttonSubmit}/>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}