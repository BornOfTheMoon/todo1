import { useParams } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Logout from '../../components/Logout/Logout';
import UpdateTaskForm from '../../components/UpdateTaskForm/UpdateTaskForm';
import styles from './UpdateTaskPage.module.scss';
import postRequest from '../../api/PostRequest';
import { setTask } from '../../App';
import * as React from 'react';
import { ReactElement } from 'react';



const getTask = async (id: number): Promise<void> => {
  const data = {
    id: id,     
  };

  console.log(data);
  
  let taskData = {data: {
      id: null,
      name: '',
      description: '',
      is_finished: false,
      parent: null
  }
  }

  const url = 'http://localhost:8080/tasks/' + id
  console.log(url)

  taskData = await postRequest(data, url)
          .catch(err => console.log(err));

  console.log(taskData)

  setTask({id: taskData.data.id,
      name: taskData.data.name,
      description: taskData.data.description,
      is_finished: taskData.data.is_finished,
      parent: taskData.data.parent,
  })
};

function UpdateTaskPage(): ReactElement<any, any> {
  const {id} = useParams()
  getTask(Number(id))
  return (
    <div className={styles.updateTaskPage}>
        <div className={styles.header}>
            <Logo/>
            <Logout/>
        </div>
        <UpdateTaskForm/>
        <div className={styles.footer}>
            all rights reserved
        </div>
    </div>
  );
}

export default UpdateTaskPage;
