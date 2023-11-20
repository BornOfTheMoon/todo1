import styles from './LoginForm.module.scss';
import * as Form from '@radix-ui/react-form';
import React, { ReactElement } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import postRequest from '../../api/PostRequest';
import { $user, $userToken, setUser, setUserToken } from '../../App';
import { useStore } from 'effector-react';

function LoginForm(): ReactElement<any, any> {
  let user = useStore($user)
  let userToken = useStore($userToken)

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const target = event.currentTarget;
 
    const data = {
      name: target.username.value,
      password: target.password.value        
    };
 
    console.log(data);
    
    let userData;
    userData = await postRequest(data, 'http://localhost:8080/users/login')
            .catch(err => {userData = null;
            console.log(err)});
    
    if (!userData) {
      target.username.value = ''
      target.password.value  = ''
      return
    }

    console.log(userData)

    user = setUser(userData.data.id)
    userToken = setUserToken(userData.data.tokens.refreshToken)

    console.log(user)
    console.log(userToken)

    navigate("/tasks", {replace: false})
  };

  return (
    <Form.Root className={styles.FormRoot} onSubmit={handleSubmit}>
      <Form.Field className={styles.FormField} name="username">
        <div className={styles.FormFieldContext}>   
            <Form.Label className={styles.FormLabel}>Name</Form.Label>
            <Form.Message className={styles.FormMessage} match="valueMissing">
              Please enter your name
            </Form.Message>
        </div>
        <Form.Control asChild className={styles.FormControl}>
          <input type="username" required placeholder='your name'/>
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="password">
        <div className={styles.FormFieldContext}>   
            <Form.Label className={styles.FormLabel}>Password</Form.Label>
            <Form.Message className={styles.FormMessage} match="valueMissing">
              Please enter your password
            </Form.Message>
        </div>
        <Form.Control asChild className={styles.FormControl}>
          <input type="password" required placeholder='your password'/>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild className={styles.Button}>
        <button type="submit">
          Sign in
        </button>
      </Form.Submit>
      <NavLink to="/register" className={styles.link}>Do not have an account? Sign up!</NavLink>
    </Form.Root>
  );
}

export default LoginForm;
