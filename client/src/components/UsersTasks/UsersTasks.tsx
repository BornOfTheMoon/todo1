import Nestable, { Item } from 'react-nestable';
import React, { useEffect } from 'react';
import styles from './UsersTasks.module.scss'
import 'react-nestable/dist/styles/index.css';
import Logo from '../../components/Logo/Logo';
import CollapseIcon from '../../components/CollapseIcon/CollapseIcon';
import { $tasks, $user, $userToken, setTask, setTasks } from '../../App';
import { useStore } from 'effector-react';
import patchRequest from '../../api/PatchRequest';
import postRequest from '../../api/PostRequest';
import { render } from 'react-dom';
import deleteRequest from '../../api/DeleteRequest';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../../pages/UsersTasksPage/UsersTasksPage';


/*const tasks = [
  {id: 14, name: 'naame'},
  {id:2, name: 'naem', children: []},
  {id: 3, name: 'ame3', children: [
    {id: 4, name: 'named'}
  ]}
]*/ 

const onChange = async (items: any) => {
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

}

function UsersTasks () {
  const navigate = useNavigate()

  const tasks = useStore($tasks) 

  const auth = useStore($userToken)
  const user = useStore($user)

  console.log(user)

  useEffect(() => {}, [tasks])

  const renderItem = ({ item, index, collapseIcon}: any) => {
    console.log(item)
  
    const toTask =async () => {
      const data = await postRequest({id: item.id}, "http://localhost:8080/tasks/" + item.id)
          .catch(err => console.log(err))
      
      setTask(data.data) 
  
      navigate('' + item.id, {replace: false})
    }
  
    const updateClick = async () => {
      const data = await postRequest({id: item.id}, "http://localhost:8080/tasks/" + item.id)
          .catch(err => console.log(err))
      
      setTask(data.data) 

      navigate('/tasks/update/' + item.id, {replace: true})  
  }
  
  const deleteClick = async () => {
      let taskData;
      taskData = await deleteRequest({id: item.id}, 'http://localhost:8080/tasks/delete')
              .catch(err => taskData = null);

      getTasks(user)
      
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
  };
}

  if (!tasks) {
    return <div>Ooooops</div>
  } else {
    return (
        <Nestable className={styles.Nestable}
          items={tasks}
          renderItem={renderItem}
          onChange={(items) => onChange(items)}
          maxDepth={3}
          renderCollapseIcon={({ isCollapsed }) =>
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
