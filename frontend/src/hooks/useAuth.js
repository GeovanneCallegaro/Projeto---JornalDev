import api from '../utils/api'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useFlashMessage} from './useFlashMessage'

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const history = useHistory()
    const {setFlashMessage} = useFlashMessage()
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated((s) => s = true)
        }
    }, [])

    async function login(user) {
        let messageType = 'sucess'
        let messageText = 'Login realizado com sucesso!'

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch(error) {
            messageText = error.response.data.message
            messageType = 'error' 
        }
        setFlashMessage(messageText, messageType)
    }

    async function register(user) {
        let messageType = 'sucess'
        let messageText = 'Cadastro realizado com sucesso!'

        try {
            await api.post('/users/register', user).then((response) => {
                return response.data
            })
            history.push('/')
        } catch (err) {
            messageType = 'error'
            messageText = err.response.data.message
        }

        
        setFlashMessage(messageText, messageType)
    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        history.push('/')
    }

    async function logout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.Authorization = undefined
        history.push('/')
    }

    return {login, register, logout, authenticated}
}