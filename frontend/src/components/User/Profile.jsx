import {useFlashMessage} from '../../hooks/useFlashMessage'
import { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'

import styles from './Profile.module.css'

import {Link, useHistory} from 'react-router-dom'

import {AiOutlineArrowLeft} from 'react-icons/ai'
import { Context } from '../../context/userContext'

export const Profile = () => {
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const history = useHistory()
    const {authenticated} = useContext(Context)

    useEffect(() => {
        api.get('users/checkuser', {
            headers: {
                Authorization: `Bearer: ${JSON.parse(token)}`
            },
        }).then((response) => {
            setUser(response.data)
        })
        
    }, [token])

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let messageType = 'sucess'

        const data = await api.patch(`/users/edituser/${user._id}`, user, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            messageType = 'error'
            return error.response.data
        })
        
        history.push('/')
        setFlashMessage(data.message, messageType)
    }
    
    return (
        <>
            {authenticated === false ? (
                history.push('/notfound')
            ) : (<></>)}
            <header className={styles.headerContainer}>
                <Link to="/"><AiOutlineArrowLeft className={styles.iconHeader}/></Link>
                <h1>LOGO</h1>
            </header>
            <div className={styles.formContainer}>
                <div className={styles.formArea}>
                    <h2>EDITE SEUS DADOS</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Nome' name="name" onChange={handleChange} />
                        <input type="number" placeholder='Idade' name='age'  onChange={handleChange} />
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                        <input type="password" placeholder='Senha' name='password'  onChange={handleChange}/>
                        <input type="password" placeholder='Confirmação de senha' name='confirmPassword'  onChange={handleChange}/>
                        <input type="submit" value="Editar" className={styles.buttonSubmit}/>
                    </form>
                </div>
            </div>
        </>
    )
}