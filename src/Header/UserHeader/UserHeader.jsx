import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { LoginState } from '../../App/App'
import { UserContext } from '../../Entrance/Entrance'
import styles from './UserHeaderStyle.module.css'

export default function UserHeader() {
    const user = useContext(UserContext)
    const [login, setLogin] = useContext(LoginState)
    const history = useHistory()
    function logout() {
        localStorage.removeItem("token");
        sessionStorage.removeItem('token');
        setLogin(false)
        history.push('/')
    }


    return (
        <div>
            {
                login ? 
                <div className={styles.userContainer}>
                    <div className={styles.userName} >{`${user[0]?.name?.first}  ${user[0]?.name?.last}`} </div>
                    <span className={styles.logout} onClick={logout}><i className="fas fa-sign-out-alt"></i></span>
                    {
                       !user[0]?.profilePicture ? 
                       <div className={styles.HeaderImg} style={{ backgroundImage: `url(${ user[0]?.profilePicture})` }}></div>
                        :
                        <i className="fas fa-user-circle"></i>
                    }
                </div>
                : 
                null

            }

        </div>
    )
}
//user[0]?.profilePicture ||