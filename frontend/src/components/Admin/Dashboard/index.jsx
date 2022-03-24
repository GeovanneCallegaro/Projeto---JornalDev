import { AiOutlineArrowLeft } from "react-icons/ai"
import {BiTrash, BiEditAlt} from 'react-icons/bi'

import {Link} from 'react-router-dom'

import styles from './Dashboard.module.css'

export const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.asideArea}>
                <h2>Seu Dashboard: Nome</h2>
                <div className={styles.containerData}>
                    <h2>Dados do site: </h2>
                    <p>Total de posts: <span>13</span></p>
                    <p>Total de usuários: <span>11</span></p>
                    <p>Total de escritores: <span>12</span></p>
                </div>
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
                        <div className={styles.userCard}>
                            <h2>Nome do Usuário: Matheus</h2>
                            <div className={styles.iconContainer}>
                                <BiEditAlt className={styles.firstIcon}></BiEditAlt>
                                <BiTrash></BiTrash>
                            </div>
                        </div>
                        <div className={styles.userCard}>
                            <h2>Nome do Usuário: Matheus</h2>
                            <div className={styles.iconContainer}>
                                <BiEditAlt className={styles.firstIcon}></BiEditAlt>
                                <BiTrash></BiTrash>
                            </div>
                        </div>
                        <div className={styles.userCard}>
                            <h2>Nome do Usuário: Matheus</h2>
                            <div className={styles.iconContainer}>
                                <BiEditAlt className={styles.firstIcon}></BiEditAlt>
                                <BiTrash></BiTrash>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}