import styles from './CreateTaskForm.module.scss';
import * as Form from '@radix-ui/react-form';
import React, { ReactElement } from 'react';
import postRequest from '../../api/PostRequest';
import { $tasks, $user } from '../../App';
import { useStore } from 'effector-react';


function CreateTaskForm(): ReactElement<any, any> {
  //const navigate = useNavigate();
  const user = useStore($user)
  const tasks = useStore($tasks)
  let parentTasks = []
  parentTasks = tasks

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const target = event.currentTarget;
 
    const data = {
      name: target.username.value,
      description: target.description.value,
      parent: Number(target.parent.value),
      user: user  
    };
 
    console.log(data);
    
    let taskData;
    taskData = await postRequest(data, 'http://localhost:8080/tasks/new')
            .catch(err => {taskData = null
            console.log(err)});
    
    if (!taskData) {
      target.username.value = ''
      target.description.value  = ''
      target.parent.value  = ''
      return
    }

    console.log(taskData)   
  };

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
          <input type="username" required placeholder='name' id='name'/>
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="description">
        <div className={styles.FormFieldContext}>   
            <Form.Label className={styles.FormLabel}>Description</Form.Label>
        </div>
        <Form.Control asChild className={styles.FormControl}>
          <textarea placeholder='description' id='description'/>
        </Form.Control>
      </Form.Field>
      <Form.Field name="parent" className={styles.FormField}>
      <div className={styles.FormFieldContext}>   
        <Form.Label className={styles.FormLabel}>Parent</Form.Label>
        </div>
        <Form.Control asChild className={styles.FormControl}>
            <select id='parent'>
                <option value={0}></option>
                {parentTasks.map((t: any) => <option value={t.id} key={t.id}>{t.name}</option>)}
            </select>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild className={styles.Button}>
        <button type="submit">
          Create
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

export default CreateTaskForm;
