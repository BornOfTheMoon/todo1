import styles from './RegisterForm.module.scss';
import * as Form from '@radix-ui/react-form';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import postRequest from '../../api/PostRequest';
import { $user, $userToken, setUser, setUserToken } from '../../App';

function RegisterForm() {
  const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.currentTarget;

        const password = target.password.value
        const password_again = target.password_again.value 

        if (password != password_again) {
            target.password_again.value = ''
            return
        }
     
        const data = {
          name: target.username.value,
          password: password
        };
     
        console.log(data);
        
        let userData;
        userData = await postRequest(data, 'http://localhost:8080/users/register')
                .catch(err => userData = null);
    
        if (!userData) {
            target.username.value = ''
            target.password.value  = ''
            target.password_again.value = ''
            return
        }
        
        console.log(userData)
    
        setUser(userData.data.id)
        setUserToken(userData.data.tokens.refreshToken)
        $user.watch(console.log)
        $userToken.watch(console.log)
    
        navigate('/tasks/', {replace: true});
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
          <input type="password" required placeholder='your password' id='password'/>
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="password_again">
        <div className={styles.FormFieldContext}>   
            <Form.Label className={styles.FormLabel}>Password again</Form.Label>
            <Form.Message className={styles.FormMessage} match="valueMissing">
              Please enter your password again
            </Form.Message>
        </div>
        <Form.Control asChild className={styles.FormControl}>
          <input type="password" required placeholder='your password again' id='password_again'/>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild className={styles.Button}>
        <button>
          Sign up
        </button>
      </Form.Submit>
      <NavLink to="/login" className={styles.link}>Already have an account? Sign in!</NavLink>
    </Form.Root>
  );
}

export default RegisterForm;
