import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import Logout from '../../components/Logout/Logout';
import UpdateTaskForm from '../../components/UpdateTaskForm/UpdateTaskForm';
import styles from './CreateTaskPage.module.scss';

function CreateTaskPage() {
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
