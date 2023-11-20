import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './UsersTasksPage.module.scss';
import postRequest from '../../api/PostRequest';
import { $user, setTasks } from '../../App';
import { useStore } from 'effector-react';
import UsersTasks from '../../components/UsersTasks/UsersTasks';
import Logout from '../../components/Logout/Logout';
import { ReactElement, useEffect } from 'react';
import * as React from 'react';


const appendChildren = (curTasks: any, user: number): any[] => {
  if (curTasks.length === 0 || curTasks === undefined) {
    return []
  }
  const t: any[] = []
  curTasks.map(async (task: any) => {
      const children = await postRequest({
        user: user,
        parent: task.id
      }, 'http://localhost:8080/tasks/tasks')
                      .catch(err => {
                        task.children = [];
                        console.log(err);
                      })

      task = {
        id: task.id,
        name: task.name,
        parent: task.parent,
        description: task.description,
        is_finished: task.is_finished,
        children: children.data
      }
      
      if (task.children !== undefined && task.children.length !== 0) {
        task.children = appendChildren(task.children, user)
      } 
      t.push(task)
    }
  )
  return t
}

export const getTasks = async (user: number | null): Promise<void> => {
  const taskData = {
    user: user,
    parent: 0
  }
  const tasks = await postRequest(taskData, 'http://localhost:8080/tasks/tasks')
          .catch(err => console.log(err));

  console.log(tasks.data)

  const usersTasks = tasks.data

  let ts
  if (usersTasks !== undefined) {
    ts = appendChildren(usersTasks, Number(user))
  }
  
  console.log(ts)
  setTasks(ts)
}

function UsersTasksPage(): ReactElement<any, any> {
  const navigate = useNavigate()
  const user = useStore($user)

  useEffect(() => {
    getTasks(user)
  }, [])
 
    return (
        <div className={styles.taskPage}>
            <div className={styles.header}>
                <Logo/>
                <Logout/>
            </div>
            <UsersTasks/>
            <div className={styles.Plus} onClick={(): void => {
                navigate('/tasks/new', {replace: true})
            }}>+</div>
            <div className={styles.footer}>
                all rights reserved
            </div>
        </div>
    );
}

export default UsersTasksPage;
