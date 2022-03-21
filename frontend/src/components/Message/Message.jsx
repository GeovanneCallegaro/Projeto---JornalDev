import { useState, useEffect } from 'react'
import bus from '../../utils/bus'

import styles from './Message.module.css'

export function Message() {
    const [visibility, setVisibility] = useState(false)
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisibility(false)
            }, 1500)
        })
    }, [])

    return (
        visibility ?
        <div className={`${styles.message} ${styles[type]}`} >
            {message}
        </div> : ''
    )
}