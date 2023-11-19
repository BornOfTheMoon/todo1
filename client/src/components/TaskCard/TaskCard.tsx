import { Route, Router, useLocation, useNavigate, useParams } from "react-router-dom";
import { $task, $user, setTask } from "../../App";
import postRequest from "../../api/PostRequest";
import styles from "./TaskCard.module.scss"
import { useEffect, useMemo } from "react";
import { useStore } from "effector-react";
import deleteRequest from "../../api/DeleteRequest";
import { $parent, setParent } from "../../pages/TaskPage/TaskPage";


function TaskCard() {
    const navigate = useNavigate()

    const {id} = useParams();
    console.log(id)

    let parentName = useStore($parent)

    const getParent = async (parentId: number | null) => {
        if (parentId && parentId > 0) {
            const data = await postRequest({id: parentId}, "http://localhost:8080/tasks/" + id)
                .catch(err => console.log(err))
            parentName = setParent(data.data.name)
        }
    }

    const task = useStore($task)
    
    const updateClick = async () => {
        const data = await postRequest({id: task.id}, "http://localhost:8080/tasks/" + task.id)
        .catch(err => console.log(err))
    
        setTask(data.data)

        navigate("/tasks/update/" + task.id, {replace: false})
    }

    const deleteClick = async () => {
        let taskData;
        taskData = await deleteRequest({id: id}, 'http://localhost:8080/tasks/delete')
                .catch(err => taskData = null);
        
        navigate("/tasks/", {replace: false})
    } 

    useEffect(() => {getParent(task.parent)})

    if (!task) {
        return <div>Ooooops</div>
    } else {
        return (
            <div className={styles.taskCard}>
                <p className={styles.taskName}>{task.name}</p>
                {task.parent ? <div className={styles.description}>
                    <p className={styles.descriptionTitle}>Parent task:</p>
                    <p className={styles.descriptionContent}>{parentName}</p>
                </div> : <div/>}
                <div className={styles.description}>
                    <p className={styles.descriptionTitle}>Description:</p>
                    <p className={styles.descriptionContent}>{task.description}</p>
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
        )
    }
  }
  
  export default TaskCard;