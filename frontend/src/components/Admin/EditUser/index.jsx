import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useFlashMessage } from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

import styles from './EditUser.module.css'

export const EditUser = () => {
    const [options, setOptions] = useState(['Sim', 'Não'])

    const [user, setUser] = useState({})
    const {id} = useParams()
    const [token] = useState(localStorage.getItem('token') || '')

    const {setFlashMessage} = useFlashMessage()
    const {history} = useHistory()

    useEffect(() => {
        api.get(`admin/user/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data.user)
        })
    }, [token, id])

    const handleOccupation = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleAdmin = (e) => {
        console.log(e.target.name)
        setUser({...user, admin: e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let messageType = 'sucess'
        console.log(user)

        if(user.admin === 'Sim') {
            user.admin = true
        } else {
            user.admin = false
        }

        console.log(user)

        const data = await api.patch(`admin/user/edit/${id}`, user, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            history.push('admin/dashboard')
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
                <h2>Edite os dados de: {user.name}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Ocupação' name='occupation' onChange={handleOccupation} value={user.occupation}/>
                    <div className={styles.form_control}>
                        <select name="admin" id="admin" onChange={handleAdmin}>
                            {options.map((option, index) => (
                                <option value={option} key={index}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Editar!" className={styles.buttonSubmit} />
                </form>
            </div>
        </div>
        </>
    )
}