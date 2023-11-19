import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.scss';

function Logo() {
  const navigate = useNavigate()
  return (
    <p className={styles.logo} onClick={() => {
      navigate('/tasks/', {replace: false})
    }}>
      ToDoList
    </p>
  );
}


export default Logo;
