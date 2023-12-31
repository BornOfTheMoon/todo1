import './App.scss';
import {createStore, createEvent} from 'effector';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TaskPage from './pages/TaskPage/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage';
import UpdateTaskPage from './pages/UpdateTaskPage/UpdateTaskPage';
import UsersTasksPage from './pages/UsersTasksPage/UsersTasksPage';
import * as React from 'react';
import { ReactElement } from 'react';


export const setUser = createEvent<number | null>()
export const setUserToken = createEvent<string | null>()
export const setTasks = createEvent<any>()
export const setTask = createEvent<object | null>()

const updateUser = (state: number | null, newState: number | null): number | null => {
  state = newState;
  return state;
}
const updateUserToken = (state: string | null, newState: string | null): string | null => {
  state = newState;
  return state;
}
const updateTasks = (state: any, newState: any): any => {
  state = newState;
  return state;
}
const updateTask = (state: any, newState: any): any => {
  state = newState;
  return state;
}


export const $user = createStore<number | null>(null)
    .on(setUser, updateUser)
export const $userToken = createStore<string | null>(null)
    .on(setUserToken, updateUserToken)
export const $tasks = createStore<any>([])
    .on(setTasks, updateTasks)
export const $task = createStore({
      id: null,
      name: '',
      description: '',
      is_finished: false,
      parent: null,
      user: ''
  }).on(setTask, updateTask)

    
$user.watch(console.log)
$userToken.watch(console.log)
$tasks.watch(console.log)
$task.watch(console.log)

$userToken.updates.watch(() => {
  console.log($userToken.getState())
  if (!$userToken) {
      window.location.replace('http://localhost:3000/login')
  }
})


function App(): ReactElement<any, any> {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='tasks/:id' element={<TaskPage/>}/>
          <Route path='tasks/new' element={<CreateTaskPage/>}/>
          <Route path='tasks/update/:id' element={<UpdateTaskPage/>}/>
          <Route path='tasks' element={<UsersTasksPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
