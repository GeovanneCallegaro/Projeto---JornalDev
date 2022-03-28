import { useContext, useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import {BiTrash, BiEditAlt} from 'react-icons/bi'

import {Link} from 'react-router-dom'
import { Context } from "../../../context/userContext"
import { useFlashMessage } from "../../../hooks/useFlashMessage"

import api from "../../../utils/api"

import styles from './Dashboard.module.css'

export const Dashboard = () => {
    const {authenticated} = useContext(Context)

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {

        if(authenticated === true) {
            api.get('users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                },
                
            }).then((response) => {
                setAdmin(response.data)
            })
        }

    }, [token, authenticated])
    
    useEffect(() => {
        api.get('/posts').then((response) => setPosts(response.data.posts))
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        api.get('admin/users', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }, 
            signal: controller.signal
        }).then((response) => {
            if(response.data.users === undefined) {
                setUsers([])
            } else {
                setUsers(response.data.users)
            }
        })

        return () => {
            controller.abort()
        }
    }, [token])

    const deleteUser = (id) => {
        let messageType = 'sucess'
        let messageText = 'Usuário excluído com sucesso!'

        api.delete(`admin/user/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedUser = users.filter((user) => user._id !== id)
            setUsers(updatedUser)
            return response.data
        }).catch((err) => {
            messageType = 'error'
            messageText = err.response.data
        })

        setFlashMessage(messageText, messageType)
    }

    console.log(posts)

    return (
        <div className={styles.dashboardContainer}>

            <aside className={styles.asideArea}>
                <h2>Bem vindo, {admin.name}!</h2>
                {posts.length > 0 ? (
                    <>
                        <div className={styles.containerData}>
                            <h2>Dados do site: </h2>
                            <p>Total de posts: <span>{posts.length}</span></p>
                            <p>Total de usuários: <span>{users.length}</span></p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.loadingContainer}>
                            <div className={styles.loading}></div>
                        </div>
                    </>
                )}
                <div className={styles.buttonContainer}>
                    <Link to="/"><button><AiOutlineArrowLeft /></button></Link>
                </div>
            </aside>
            <div className={styles.sectionRight}>
                <header className={styles.headerContainer}>
                    <h1>LOGO</h1>
                </header>
                <main className={styles.mainSection}>
                    <h2>Usuários da Plataforma:</h2>
                    <div className={styles.usersSection}>
                        {users.length > 0 ? (
                            <>
                                {users.map((user) => (
                                    <div className={styles.userCard} key={user._id}>
                                        <h2>Nome do usuário: {user.name}</h2>
                                        <div className={styles.iconContainer}>
                                            <Link to={`/admin/user/edit/${user._id}`}><BiEditAlt className={styles.firstIcon}></BiEditAlt></Link>
                                            <BiTrash onClick={() => {deleteUser(user._id)}}></BiTrash>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ): ''}
                        {users.length === 0 ?(
                            <>
                                <div>
                                    <p className={styles.loadingText}>Não há usuários!</p>
                                </div>
                            </>
                        ): ''}
                    </div>
                </main>
            </div>
        </div>
    )
}