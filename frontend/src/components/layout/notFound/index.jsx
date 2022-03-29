import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'


export const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1>ERROR</h1>
            <p>Página não encontrada ou não permitida!</p>
            <Link className={styles.backP} to="/">Voltar a Página Inicial!</Link>
        </div>
    )
}