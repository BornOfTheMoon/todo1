import { ReactElement } from 'react';
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';
import Logo from '../../components/Logo/Logo';
import Logout from '../../components/Logout/Logout';
import styles from './CreateTaskPage.module.scss';
import * as React from 'react';

function CreateTaskPage(): ReactElement<any, any> {
  return (
    <div className={styles.createTaskPage}>
        <div className={styles.header}>
            <Logo/>
            <Logout/>
        </div>
        <CreateTaskForm/>
        <div className={styles.footer}>
            all rights reserved
        </div>
    </div>
  );
}

export default CreateTaskPage;
