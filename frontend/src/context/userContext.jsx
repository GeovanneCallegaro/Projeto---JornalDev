import {createContext} from 'react'
import { useAuth } from '../hooks/useAuth'
import { useMode } from '../hooks/useMode'

export const Context = createContext()

export const UserProvider = ({children}) => {
    const {login, register, authenticated} = useAuth()
    const {setterTheme} = useMode()

    return (
        <Context.Provider value={{login, register, setterTheme, authenticated}}>
            {children}
        </Context.Provider>
    )
}
