import { useParams } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './TaskPage.module.scss';
import postRequest from '../../api/PostRequest';
import TaskCard from '../../components/TaskCard/TaskCard';
import { $user, $userToken, setTask } from '../../App';
import Logout from '../../components/Logout/Logout';
import { createEvent, createStore } from 'effector';
import * as React from 'react';
import { ReactElement } from 'react';


export const setParent = createEvent<string | null>()

const updateParent = (state: string | null, newState: string | null): string | null => {
  state = newState;
  return state;
}

export const $parent = createStore<string | null>(null)
    .on(setParent, updateParent)

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


function TaskPage(): ReactElement<any, any> {
    console.log($userToken.getState())
    console.log($user.getState())

    const {id} = useParams();

    getTask(Number(id))

    return (
        <div className={styles.taskPage}>
            <div className={styles.header}>
                <Logo/>
                <Logout/>
            </div>
            <TaskCard></TaskCard>
            <div className={styles.footer}>
                all rights reserved
            </div>
        </div>
    );
}

export default TaskPage;
