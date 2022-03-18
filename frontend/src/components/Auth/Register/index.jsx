import styles from './Register.module.css'

import {Link} from 'react-router-dom'

import { useContext, useState } from 'react'

import {FaEye, FaEyeSlash, FaArrowLeft} from 'react-icons/fa'
import {AiOutlineMail, AiOutlineUser, AiTwotoneTool} from 'react-icons/ai'

import { Context } from '../../../context/userContext'

export const Register = () => {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const inputNull = document.querySelector('.Register_nullInput__eo1p-')

        if(user.name || user.email || user.age || user.password || user.confirmPassword === '') {
            inputNull.style.display = 'block'
            setTimeout(() => {
                inputNull.style.display = 'none'
            }, 2000)
        }

        register(user)
    }

    const handleIconChange = () => {
        const inputPassword = document.querySelector('.Register_passwordInput__0GDhQ')
        const icon = document.querySelector('.Register_iconEye__H7Kmi')
        const iconSlash = document.querySelector('.Register_iconEyeSlash__NS62c')

        inputPassword.type = 'text'
        if(inputPassword.type !== 'password') {
            iconSlash.style.display = 'block'
            icon.style.display = 'none'
        }
    }

    const handleSlashIconChange = () => {
        const inputPassword = document.querySelector('.Register_passwordInput__0GDhQ')
        const icon = document.querySelector('.Register_iconEye__H7Kmi')
        const iconSlash = document.querySelector('.Register_iconEyeSlash__NS62c')

        inputPassword.type = 'password'
        if(inputPassword.type === 'password') {
            iconSlash.style.display = 'none'
            icon.style.display = 'block'
        }
    }

    const handleIconChangeConfirm = () => {
        const inputConfirmPassword = document.querySelector('.Register_confirmPasswordInput__Aeqyh')
        const iconConfirm = document.querySelector('.Register_iconEyeConfirm__1IMjH')
        const iconSlashConfirm = document.querySelector('.Register_iconEyeSlashConfirm2__6KEO2')

        inputConfirmPassword.type = 'text'
        if(inputConfirmPassword.type !== 'password') {
            iconSlashConfirm.style.display = 'block'
            iconConfirm.style.display = 'none'
        }
    }

    const handleSlashIconChangeConfirm = () => {
        const inputConfirmPassword = document.querySelector('.Register_confirmPasswordInput__Aeqyh')
        const iconConfirm = document.querySelector('.Register_iconEyeConfirm__1IMjH')
        const iconSlashConfirm = document.querySelector('.Register_iconEyeSlashConfirm2__6KEO2')

        inputConfirmPassword.type = 'password'
        if(inputConfirmPassword.type === 'password') {
            iconSlashConfirm.style.display = 'none'
            iconConfirm.style.display = 'block'
        }
    }

    return (
        <section>
            <div className={styles.backgroundImage}></div>
                <div className={styles.containerArrow}>
                    <Link to="/"><FaArrowLeft className={styles.arrowLeftIcon} /></Link>
                </div>
            <div className={styles.formSection}>
                <div className={styles.nullInput}>
                    <p>Todos os dados devem ser preenchidos!</p>
                </div>
                <div className={styles.formElement}>
                        <AiOutlineMail className={styles.emailIcon} />
                        <AiOutlineUser className={styles.userIcon} />
                        <AiTwotoneTool className={styles.ageIcon}/>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='name' placeholder='Digite seu nome' autoFocus className={styles.inputName} onChange={handleChange}/>
                        <input type="number" name='age' placeholder='Digite sua idade' onChange={handleChange}/>
                        <input type="email" name='email' placeholder='Digite seu email' onChange={handleChange}/>
                        <input type="password" name='password' placeholder='Digite sua senha' className={styles.passwordInput} onChange={handleChange}/>
                        <input type="password" name='confirmPassword' placeholder='Digite a senha novamente' className={styles.confirmPasswordInput} onChange={handleChange}/>
                        <input type="submit" value='CADASTRE-SE' className={styles.inputSubmit}/>
                        <FaEye className={styles.iconEye} onClick={handleIconChange}/>
                        <FaEyeSlash className={styles.iconEyeSlash} onClick={handleSlashIconChange} />
                        <FaEye className={styles.iconEyeConfirm} onClick={handleIconChangeConfirm}/>
                        <FaEyeSlash className={styles.iconEyeSlashConfirm2} onClick={handleSlashIconChangeConfirm} />
                    </form>
                </div>
            </div>
        </section>
    )
}