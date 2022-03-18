import styles from './Login.module.css'

import { useState, useContext } from 'react'

import { Link } from 'react-router-dom'
import {FaArrowLeft, FaEye, FaEyeSlash} from 'react-icons/fa'

import {Context} from '../../../context/userContext'

export const Login = () => {
    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault()

        const inputNull = document.querySelector('.Login_nullInput__5pe9b')

        if(user.email || user.password === '') {
            inputNull.style.display = 'block'
            setTimeout(() => {
                inputNull.style.display = 'none'
            }, 2000)
        }

        login(user)
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

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
                    <div className={styles.nullInput}>
                        <p>Insira todos os dados!</p>
                    </div>
                <div className={styles.formLoginSection}>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email"  placeholder='Digite seu email' className={styles.firstInput} autoFocus onChange={handleChange}/>
                        <input type="password" name="password" placeholder='Digite sua senha' className={styles.secondInput} onChange
                        ={handleChange}/>
                        <FaEye className={styles.iconEye} onClick={handleIconChange}/>
                        <FaEyeSlash className={styles.iconEyeSlash} onClick={handleSlashIconChange}></FaEyeSlash>
                        <input type='submit' value='ENTRAR' className={styles.inputSubmit}/>
                    </form>
                    <div className={styles.registerArea}>
                        <p>Ainda não é cadastrado? Registre-se clicando <Link to="/users/register">aqui!</Link></p>
                    </div>
                </div>
            </div>
            <div className={styles.backgroundImage}></div>
        </section>
    )
}