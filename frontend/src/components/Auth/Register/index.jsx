import styles from './Register.module.css'

import {FaEye, FaEyeSlash, FaArrowLeft} from 'react-icons/fa'
import {AiOutlineMail, AiOutlineUser, AiTwotoneTool} from 'react-icons/ai'

export const Register = () => {

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
        const inputPassword = document.querySelector('.Register_confirmPasswordInput__Aeqyh')
        const icon = document.querySelector('.Register_iconEyeConfirm__1IMjH')
        const iconSlash = document.querySelector('.Register_iconEyeSlashConfirm__4I+-j')

        inputPassword.type = 'text'
        if(inputPassword.type !== 'password') {
            iconSlash.style.display = 'block'
            icon.style.display = 'none'
        }
    }

    const handleSlashIconChangeConfirm = () => {
        const inputPassword = document.querySelector('.Register_confirmPasswordInput__Aeqyh')
        const icon = document.querySelector('.Register_iconEyeConfirm__1IMjH')
        const iconSlash = document.querySelector('.Register_iconEyeSlashConfirm__4I+-j')

        inputPassword.type = 'password'
        if(inputPassword.type === 'password') {
            iconSlash.style.display = 'none'
            icon.style.display = 'block'
        }
    }

    return (
        <section>
            <div className={styles.backgroundImage}></div>
                <div className={styles.containerArrow}>
                    <FaArrowLeft className={styles.arrowLeftIcon} /> <p className={styles.textArrow}>Back to home</p>
                </div>
            <div className={styles.formSection}>
                <div className={styles.formElement}>
                        <AiOutlineMail className={styles.emailIcon} />
                        <AiOutlineUser className={styles.userIcon} />
                        <AiTwotoneTool className={styles.ageIcon}/>
                    <form>
                        <input type="text" name='name' placeholder='Digite seu nome' autoFocus className={styles.inputName}/>
                        <input type="number" name='age' placeholder='Digite sua idade'/>
                        <input type="email" name='email' placeholder='Digite seu email'/>
                        <input type="password" name='password' placeholder='Digite sua senha' className={styles.passwordInput}/>
                        <input type="password" name='confirmPassword' placeholder='Digite a senha novamente' className={styles.confirmPasswordInput}/>
                        <input type="submit" value='CADASTRE-SE' className={styles.inputSubmit}/>
                        <FaEye className={styles.iconEye} onClick={handleIconChange}/>
                        <FaEyeSlash className={styles.iconEyeSlash} onClick={handleSlashIconChange} />
                        <FaEye className={styles.iconEyeConfirm} onClick={handleIconChangeConfirm}/>
                        <FaEyeSlash className={styles.iconEyeSlashConfirm} onClick={handleSlashIconChangeConfirm} />
                    </form>
                </div>
            </div>
        </section>
    )
}