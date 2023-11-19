import { Route, useNavigate, useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import styles from './UsersTasksPage.module.scss';
import postRequest from '../../api/PostRequest';
import { $tasks, $user, $userToken, setTasks, setUser, setUserToken } from '../../App';
import { useStore } from 'effector-react';
import UsersTasks from '../../components/UsersTasks/UsersTasks';
import Logout from '../../components/Logout/Logout';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { sample } from 'effector';


const appendChildren = (curTasks: any, user: number) => {
  if (curTasks.length === 0 || curTasks === undefined) {
    return []
  }
  let t: any[] = []
  curTasks.map(async (task: any) => {
      let children = await postRequest({
        user: user,
        parent: task.id
      }, 'http://localhost:8080/tasks/tasks')
                      .catch(err => task.children = [])

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

export const getTasks = async (user: number | null) => {
  let tasks;
  const taskData = {
    user: user,
    parent: 0
  }
  tasks = await postRequest(taskData, 'http://localhost:8080/tasks/tasks')
          .catch(err => console.log(err));

  console.log(tasks.data)

  let usersTasks = tasks.data

  let ts
  if (usersTasks !== undefined) {
    ts = appendChildren(usersTasks, Number(user))
  }
  
  console.log(ts)
  setTasks(ts)
}
 
function UsersTasksPage() {
  const navigate = useNavigate()
  const user = useStore($user)
  getTasks(user)
 
    return (
        <div className={styles.taskPage}>
            <div className={styles.header}>
                <Logo/>
                <Logout/>
            </div>
            <UsersTasks/>
            <div className={styles.Plus} onClick={() => {
                navigate('/tasks/new', {replace: true})
            }}>+</div>
            <div className={styles.footer}>
                all rights reserved
            </div>
        </div>
    );
}

export default UsersTasksPage;
