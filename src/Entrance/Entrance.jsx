
import React, {useContext, createContext, useEffect, useState } from 'react'
import Style from './EntranceStyle.module.css'
import Login from './Login/Login'
import Register from './Register/Register'
import Loding from '../Components/Loding/Loding'
import { serverReq } from '../functions'
import { LoginState } from '../App/App'
import { useHistory } from 'react-router'

export const UserContext = createContext()

export default function Entrance({ children }) {
    const [user, setUser] = useState('gust')
    const [registerState, setRegisterState] = useState(true)
    const [login, setLogin] = useContext(LoginState)
    const history = useHistory()

    useEffect(() => {
        let isMounted = true; 
        loginWithToken()
      }, [])

      async function loginWithToken() {
        try {
            if (localStorage.token || sessionStorage.token) {
                const response =   await serverReq('post', '/locaSLogin')
                setUser(response)
                setLogin(true)
               
            }
            else{
                setUser()
            }
            
        } catch (error) {
            window.localStorage.removeItem("token")
            window.sessionStorage.removeItem("token")
            window.location.reload(false)
            history.push('/register')
        }
    }





    

    return (
        <UserContext.Provider value={[user, setUser]}>
            {user ? user === 'gust' ? <Loding text="ברוך הבא!"/> : children :
                <div className={Style.container}>
                    <div className={Style.form}>
                    {registerState ? <Register toConnect={[registerState, setRegisterState]} /> : <Login toRegister={[registerState, setRegisterState]}/>}
                    </div>
                </div>
            }   
        </UserContext.Provider>
    )
}
