import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.scss';
import * as React from 'react';
import { ReactElement } from 'react';


function Logo(): ReactElement<any, any> {
  const navigate = useNavigate()
  return (
    <p className={styles.logo} onClick={(): void => {
      navigate('/tasks/', {replace: false})
    }}>
      ToDoList
    </p>
  );
}


export default Logo;
