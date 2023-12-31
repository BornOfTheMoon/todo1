import styles from './UpdateTaskForm.module.scss';
import * as Form from '@radix-ui/react-form';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { $task, $tasks, $user } from '../../App';
import { useStore } from 'effector-react';
import patchRequest from '../../api/PatchRequest';
import deleteRequest from '../../api/DeleteRequest';


function UpdateTaskForm(): ReactElement<any, any> {
  const navigate = useNavigate()

  const {id} = useParams()
  const tasks = useStore($tasks)
  let parentTasks = []
  parentTasks = tasks

  let task = {
    id: null,
    name: '',
    description: '',
    is_finished: false,
    parent: null
  }
  
  task = useStore($task)

  let click = '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (click === 'delete') {
      let taskData;
      taskData = await deleteRequest({id: id}, 'http://localhost:8080/tasks/delete')
              .catch(err => {
                taskData = null;
                console.log(err);
              });
      
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
              .catch(err => {
                taskData = null;
                console.log(err);
              });
      
      if (!taskData) {
        target.username.value = ''
        target.description.value  = ''
        target.parent.value  = ''
        return
      }

      console.log(taskData) 
    }  
  };

  const updateClick = (): void => {
    click = 'update';
  }

  const deleteClick = (): void => {
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
                <option value={0} key={0}></option>
                {parentTasks.map((t: any) => <option value={t.id} key={t.id}>{t.name}</option>)}
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
