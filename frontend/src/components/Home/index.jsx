import { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'
import { Context } from '../../context/userContext'

import { Header } from '../layout/Header'
import { MainPosts } from '../MainPosts'

export const Home = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState({})
    const {authenticated} = useContext(Context)

    useEffect(() => {
        if(authenticated === true) {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        }
    }, [token, authenticated])

    console.log(user)

    return (
        <>
            <Header user={user}></Header>
            <MainPosts></MainPosts>
        </>
    )  
}   