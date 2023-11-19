import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import styles from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={styles.loginPage}>
        <div className={styles.header}>
            <Logo/>
        </div>
        <LoginForm/>
        <div className={styles.footer}>
            all rights reserved
        </div>
    </div>
  );
}

export default LoginPage;
