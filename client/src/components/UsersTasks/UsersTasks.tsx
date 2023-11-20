import Nestable from 'react-nestable';
import { ReactElement, useEffect } from 'react';
import styles from './UsersTasks.module.scss'
import 'react-nestable/dist/styles/index.css';
import { $tasks, $user, setTask } from '../../App';
import { useStore } from 'effector-react';
import patchRequest from '../../api/PatchRequest';
import postRequest from '../../api/PostRequest';
import deleteRequest from '../../api/DeleteRequest';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../../pages/UsersTasksPage/UsersTasksPage';
import * as React from 'react';


const onChange = async (items: any): Promise<void> => {
  console.log(items)
  const updateElem = items.dragItem
  let parentId = 0
  let parentElem = items[0]
  if (items.targetPath.length > 1) {
    parentElem = items.items[items.targetPath[0]]
    for (let i = 1; i < items.targetPath.length - 1; i++) {
      parentElem = parentElem.children[items.targetPath[i]]
    }
    parentId = parentElem.id
  } 

  const data = {
    id: updateElem.id,
    parent: parentId
  }

  const updatedElem = await patchRequest(data, 'http://localhost:8080/tasks/update')
      .catch(err => console.log(err))
  console.log(updatedElem)

}

function UsersTasks (): ReactElement<any, any> {
  const navigate = useNavigate()

  let tasks: any[] = []
  tasks = useStore($tasks) 

  const user = useStore($user)

  console.log(user)

  useEffect(() => {console.log('update')}, [tasks])

  const renderItem = ({ item, collapseIcon}: any): ReactElement<any, any> => {
    console.log(item)
  
    const toTask =async (): Promise<void> => {
      const data = await postRequest({id: item.id}, "http://localhost:8080/tasks/" + item.id)
          .catch(err => console.log(err))
      
      setTask(data.data) 
  
      navigate('' + item.id, {replace: false})
    }
  
    const updateClick = async (): Promise<void> => {
      const data = await postRequest({id: item.id}, "http://localhost:8080/tasks/" + item.id)
          .catch(err => console.log(err))
      
      setTask(data.data) 

      navigate('/tasks/update/' + item.id, {replace: true})  
  }
  
  const deleteClick = async (): Promise<void> => {
      let taskData;
      taskData = await deleteRequest({id: item.id}, 'http://localhost:8080/tasks/delete')
              .catch(err => {
                taskData = null;
                console.log(err)
              });

      getTasks(user)
      console.log(taskData)
      
      navigate('/tasks', {replace: false}) 
  }
  if (!tasks) {
    return <div>Ooooops</div>
  } else {  
    return (
      <div className={styles.row}>
        <div className={styles.item}>
          <p>{collapseIcon}</p>
          <p className={styles.name} onClick={toTask}>{item.name}</p>
        </div>
        <div className={styles.buttons}>
            <button type="button" onClick={updateClick}>
              Update
            </button>
            <button type='button' onClick={deleteClick}>
              Delete
            </button>
        </div>
      </div>
    );
  }
}

  if (!tasks) {
    return <div>Ooooops</div>
  } else {
    return (
        <Nestable className={styles.Nestable}
          items={tasks}
          renderItem={renderItem}
          onChange={(items): Promise<void> => onChange(items)}
          maxDepth={3}
          renderCollapseIcon={({ isCollapsed }): ReactElement<any, any> =>
            isCollapsed ? (
              <span className={styles.iconCollapse}>+</span>
            ) : (
              <span className={styles.iconCollapse}>-</span>
            )
          }
          collapsed={false}
        />
    )
  }
}

export default UsersTasks;
