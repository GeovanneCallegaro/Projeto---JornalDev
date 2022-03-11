import styles from './Register.module.css'

export const Register = () => {
    return (
        <section>
            <div className={styles.backgroundImage}></div>
            <div className={styles.formSection}>
                <div className={styles.formElement}>
                    <form>
                        <input type="text" name='name'/>
                        <input type="number" name='age'/>
                        <input type="email" name='email'/>
                        <input type="password" name='password'/>
                        <input type="password" name='confirmPassword'/>
                    </form>
                </div>
            </div>
        </section>
    )
}