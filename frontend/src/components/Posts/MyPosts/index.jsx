import styles from './MyPosts.module.css'

import {AiOutlineArrowLeft} from 'react-icons/ai'
import {BiTrash, BiEditAlt} from 'react-icons/bi'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import api from '../../../utils/api'

export const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            await api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        }
        fetchUser()
    }, [token])

    useEffect(() => {
        if(Object.keys(user).length > 0) {
            api.get('/posts/myposts', user, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setPosts(response.data.posts)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [user, token])


    return (
        <>
            <header className={styles.headerContainer}>
                <Link to="/"><AiOutlineArrowLeft className={styles.iconHeader}/></Link>
                <h1>LOGO</h1>
            </header>
            <section className={styles.sectionContainer}>
                <div className={styles.postsContainer}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className={styles.postItem}>
                                <div className={styles.textSection}>
                                    <h2>Titulo: {post.title}</h2>
                                    <p>Subtitulo: {post.subtitle}</p>
                                </div>
                                <div className={styles.buttonsSection}>
                                    <BiTrash className={styles.iconTrash}></BiTrash>
                                    <BiEditAlt className={styles.iconEdit}></BiEditAlt>
                                </div>
                            </div>
                    ))
                    ) : (
                        <p className={styles.noPosts}>Não há posts cadastrados!</p>
                    )}
                </div>
            </section>
        </>
    )
}