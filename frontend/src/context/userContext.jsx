import {createContext} from 'react'
import { useAuth } from '../hooks/useAuth'

export const Context = createContext()

export const UserProvider = ({children}) => {
    const {login, authenticated} = useAuth()

    return (
        <Context.Provider value={{login, authenticated}}>
            {children}
        </Context.Provider>
    )
}
