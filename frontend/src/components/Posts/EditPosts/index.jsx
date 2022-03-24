import styles from './EditPosts.module.css'

import { AiOutlineArrowLeft } from 'react-icons/ai'

import { Link, useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {useFlashMessage} from '../../../hooks/useFlashMessage'

import api from '../../../utils/api'

export const EditPosts = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const [post, setPost] = useState({})
    const {setFlashMessage} = useFlashMessage()
    const {id} = useParams()
    const history = useHistory()

    const handlePost = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        api.get(`posts/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPost(response.data.post)
        })
    }, [token, id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let messageType = 'sucess'
        console.log(post)

        const data = await api.patch(`posts/editnotice/${post._id}`, post, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            history.push('/posts/myposts')
            return response.data
        }).catch((err) => {
            messageType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, messageType)
    }

    return (
        <>
        <header className={styles.headerContainer}>
                <Link to="/posts/myposts"><AiOutlineArrowLeft className={styles.iconHeader}/></Link>
                <h1>LOGO</h1>
        </header>
        <div className={styles.formContainer}>
            <div className={styles.formArea}>
                <h2>Edite sua Notícia</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Título' name='title' onChange={handlePost} value={post.title}/>
                    <input type="text" placeholder='Subtítulo' name='subtitle' onChange={handlePost} value={post.subtitle}/>
                    <input type="text" placeholder='Tema' name='theme' onChange={handlePost} value={post.theme}/>
                    <input type="submit" value="Editar!" className={styles.buttonSubmit} />
                </form>
            </div>
        </div>
        </>
    )
}