
import React, { createContext, useEffect, useState } from 'react'
import Style from './EntranceStyle.module.css'
import Login from './Login/Login'
import Register from './Register/Register'
import Loding from '../Components/Loding/Loding'
import { serverReq } from '../functions'
import { useContext } from 'react/cjs/react.development'
import { LoginState } from '../App/App'

export const UserContext = createContext()

export default function Entrance({ children }) {
    const [user, setUser] = useState('gust')
    const [registerState, setRegisterState] = useState(true)
    const [login, setLogin] = useContext(LoginState)

    useEffect(() => {
        async function loginWithToken() {
            try {
                if (localStorage.token || sessionStorage.token) {
                    const response =   await serverReq('post', '/locaSLogin')
                    // console.log(`In Entrance page, responce: ${response}`)
                    setUser(response)
                    setLogin(true)
                    
                }
                else{
                    setUser()
                }
                
            } catch (error) {
               // console.log(`In Entrance page, error: ${error.response?.data?.error || error.message || error}`)
                
            }
        }
        loginWithToken()
      }, [])





    

    return (
        <UserContext.Provider value={[user, setUser]}>
            {user ? user === 'gust' ? <Loding text="ברוך הבא!"/> : children :
                <div className={Style.container}>
                    <div className={Style.form}>
                    {registerState ? <Register toConnect={[registerState, setRegisterState]} /> : <Login toRegister={[registerState, setRegisterState]}/>}
                    </div>
                    <div className={Style.gif}></div>
                </div>
            }   
        </UserContext.Provider>
    )
}
