import api from '../utils/api'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState()
    const history = useHistory()
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated((s) => s = true)
        }
    }, [])

    async function login(user) {
        try {
            const data = await api.post('/users/login').then((response) => {
                return response.data
            })

            await authUser(data)
        } catch(err) {
            console.log(err)
        }
    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        history.push('/')
    }

    return {login, authenticated}
}