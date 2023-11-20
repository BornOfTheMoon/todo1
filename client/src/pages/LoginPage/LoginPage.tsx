import { ReactElement } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import styles from './LoginPage.module.scss';
import * as React from 'react';


function LoginPage(): ReactElement<any, any> {
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
