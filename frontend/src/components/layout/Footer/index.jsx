import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footerSection}>
            <div className={styles.footerElements}>
                <p>Todos os direitos reservados ao Dev <a href='https://www.linkedin.com/in/geovanne-callegaro-76b1a8216/'>Geovanne Callegaro</a>&copy;</p>
            </div>
        </footer>
    )
}