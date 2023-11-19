import Logo from '../../components/Logo/Logo';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.scss';

function RegisterPage() {
  return (
    <div className={styles.registerPage}>
        <div className={styles.header}>
            <Logo/>
        </div>
        <RegisterForm/>
        <div className={styles.footer}>
            all rights reserved
        </div>
    </div>
  );
}

export default RegisterPage;
