import styles from './createPosts.module.css'

import {Link, useHistory} from 'react-router-dom'

import {AiOutlineArrowLeft} from 'react-icons/ai'

import { useContext, useState } from 'react'
import {useFlashMessage} from '../../../hooks/useFlashMessage'

import api from '../../../utils/api'
import { Context } from '../../../context/userContext'

export const CreatePosts = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const history = useHistory()
    const {setFlashMessage} = useFlashMessage()
    const [post, setPost] = useState({})
    const {authenticated} = useContext(Context)

    const handlePost = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const registerPost = async (e) => {
        e.preventDefault()

        let messageType = 'sucess'
        

        const data = await api.post('/posts/createnotice', post, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            history.push('/')
            return response.data
        }).catch((error) => {
            messageType = 'error'
            return error.response.data
        })

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
                    <h2>CRIE UMA NOTÍCIA</h2>
                    <form onSubmit={registerPost}>
                        <input type="text" name='title' placeholder='Título' onChange={handlePost}/>
                        <input type="text" name='subtitle' placeholder='Subtítulo' onChange={handlePost}/>
                        <input type="text" name='theme' placeholder='Tema' onChange={handlePost}/>
                        <input type="submit" value='Criar' className={styles.buttonSubmit}/>
                    </form>
                </div>
            </div>
        </>  
    )
}