import styles from './UpdateTaskForm.module.scss';
import * as Form from '@radix-ui/react-form';
import React, { useEffect } from 'react';
import { NavLink, Navigate, Route, redirect, useNavigate, useParams } from 'react-router-dom';
import postRequest from '../../api/PostRequest';
import axios from 'axios';
import { $task, $tasks, $user, $userToken, setTask, setUser, setUserToken } from '../../App';
import { useStore } from 'effector-react';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import RegisterForm from '../RegisterForm/RegisterForm';
import patchRequest from '../../api/PatchRequest';
import deleteRequest from '../../api/DeleteRequest';


function UpdateTaskForm() {
  const navigate = useNavigate()

  const {id} = useParams()
  const tasks = useStore($tasks)
  let parentTasks = []
  parentTasks = tasks
  parentTasks.push({id: 0, name: ''})

  let task = {
    id: null,
    name: '',
    description: '',
    is_finished: false,
    parent: null
  }
  
  task = useStore($task)

  let click = '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (click === 'delete') {
      let taskData;
      taskData = await deleteRequest({id: id}, 'http://localhost:8080/tasks/delete')
              .catch(err => taskData = null);
      
      navigate("/tasks", {replace: false})
      console.log(taskData)

    } else if (click === 'update') {
      const target = event.currentTarget;
  
      const data = {
        id: id,
        name: target.username.value,
        description: target.description.value,
        parent: Number(target.parent.value),
        user: $user.getState()    
      };
  
      console.log(data);
      
      let taskData;
      taskData = await patchRequest(data, 'http://localhost:8080/tasks/update')
              .catch(err => taskData = null);
      
      if (!taskData) {
        target.username.value = ''
        target.description.value  = ''
        target.parent.value  = ''
        return
      }

      console.log(taskData) 
    }  
  };

  const updateClick = () => {
    click = 'update';
  }

  const deleteClick = () => {
    click = 'delete';
  }

  for (let i = 0; i < parentTasks.length; i++) {
    if (parentTasks[i].id === task.parent) {
        parentTasks[i].default = true
        break;
    }
  }

  return (
    <Form.Root className={styles.FormRoot} onSubmit={handleSubmit}>
      <Form.Field className={styles.FormField} name="username">
        <div className={styles.FormFieldContext}>   
            <Form.Label className={styles.FormLabel}>Name</Form.Label>
            <Form.Message className={styles.FormMessage} match="valueMissing">
              Please enter name
            </Form.Message>
        </div>
        <Form.Control asChild className={styles.FormControl}>
          <input type="username" required placeholder='name' id='name' defaultValue={task.name}/>
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="description">
        <div className={styles.FormFieldContext}>   
            <Form.Label className={styles.FormLabel}>Description</Form.Label>
        </div>
        <Form.Control asChild className={styles.FormControl}>
          <textarea placeholder='description' id='description' defaultValue={task.description}/>
        </Form.Control>
      </Form.Field>
      <Form.Field name="parent" className={styles.FormField}>
        <Form.Label className={styles.FormFieldContext}>Parent</Form.Label>
        <Form.Control asChild className={styles.FormControl}>
            <select id='parent' value={Number(task.parent)}>
                {parentTasks.map((t: any) => <option value={t.id}>{t.name}</option>)}
            </select> 
        </Form.Control>
      </Form.Field>
      <div className={styles.buttons}>
        <Form.Submit asChild className={styles.Button}>
          <button type="submit" onClick={updateClick}>
            Update
          </button>
        </Form.Submit>
        <Form.Submit asChild className={styles.Button}>
          <button type='submit' onClick={deleteClick}>
            Delete
          </button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
}

export default UpdateTaskForm;
