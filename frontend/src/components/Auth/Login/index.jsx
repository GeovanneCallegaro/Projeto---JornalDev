import styles from './Login.module.css'

import { Link } from 'react-router-dom'
import {FaArrowLeft, FaEye, FaEyeSlash} from 'react-icons/fa'

export const Login = () => {
    const handleIconChange = () => {
        const inputPassword = document.querySelector('.Login_secondInput__8MOBa')
        const icon = document.querySelector('.Login_iconEye__3E-db')
        const iconSlash = document.querySelector('.Login_iconEyeSlash__vCD6J')

        inputPassword.type = 'text'
        if(inputPassword.type !== 'password') {
            iconSlash.style.display = 'block'
            icon.style.display = 'none'
        }
    }

    const handleSlashIconChange = () => {
        const inputPassword = document.querySelector('.Login_secondInput__8MOBa')
        const icon = document.querySelector('.Login_iconEye__3E-db')
        const iconSlash = document.querySelector('.Login_iconEyeSlash__vCD6J')

        inputPassword.type = 'password'
        if(inputPassword.type === 'password') {
            iconSlash.style.display = 'none'
            icon.style.display = 'block'
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.arrowLeft}>
                <Link to="/"><FaArrowLeft className={styles.icon}></FaArrowLeft></Link>
            </div>
            <div className={styles.loginSection}>
                <div className={styles.formLoginSection}>
                    <form>
                        <input type="email" name="email" placeholder='Digite seu email' className={styles.firstInput} autoFocus/>
                        <input type="password" name="password" placeholder='Digite sua senha' className={styles.secondInput} /><FaEye className={styles.iconEye} onClick={handleIconChange}/><FaEyeSlash className={styles.iconEyeSlash} onClick={handleSlashIconChange}></FaEyeSlash>
                    </form>
                    <button>LOGIN</button>
                    <div className={styles.registerArea}>
                        <p>Ainda não é cadastrado? Registre-se clicando <Link to="/users/register">aqui!</Link></p>
                    </div>
                </div>
            </div>
            <div className={styles.backgroundImage}></div>
        </section>
    )
}