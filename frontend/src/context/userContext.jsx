import {createContext} from 'react'
import { useAuth } from '../hooks/useAuth'

export const Context = createContext()

export const UserProvider = ({children}) => {
    const {login, register, authenticated} = useAuth()

    return (
        <Context.Provider value={{login, register, authenticated}}>
            {children}
        </Context.Provider>
    )
}
