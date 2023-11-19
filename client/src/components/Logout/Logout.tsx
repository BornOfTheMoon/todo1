import { useStore } from "effector-react";
import postRequest from "../../api/PostRequest";
import { $user, $userToken, setUser, setUserToken } from "../../App";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.scss"

function Logout() {
    const navigate = useNavigate()

    const value = useStore($user)
    
    const logout = async () => {
        console.log(value)
        const data = {
            id: value
          };

          console.log(data)
        
        console.log(JSON.stringify(data))

        let userData;
        userData = await postRequest(data, 'http://localhost:8080/users/logout')
                .catch(err => userData = null);

        console.log(userData)

        if (userData.data.refresh_token) {
            console.log('mistake')
        }
        
        $user.reset()
        $userToken.reset()

        navigate("/login", {replace: false})
    }

    return (
        <div onClick={logout} className={styles.Logout}>Log out</div>
    )
}

export default Logout;