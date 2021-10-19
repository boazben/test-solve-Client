import React, { useContext, useState } from 'react'
import {Link, useHistory } from 'react-router-dom'
import { LoginState } from '../../App/App'
import { serverReq } from '../../functions'
import { UserContext } from '../Entrance'
import Style from './Login.module.css'


export default function Login({toRegister}) {
    
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState('')
    const [login, setLogin] = useContext(LoginState)
    const [registerState, setRegisterState] = toRegister


    async function toLogin(e) {
        try {
            
            e.preventDefault()
            const values = Object.values(e.target)
            .reduce((acc, input) => !input.name ? acc : ({
                ...acc,
                [input.name]: input.type == 'checkbox' ? input.checked : input.value
            }), {}
            )
           
            const res = await serverReq('post', '/login', {"email": values.email, "password": values.password})
            sessionStorage.token = res.token
            if (values.stayConnected) localStorage.token = res.token
            setUser(res)
            setLogin(true)
            
        } catch (error) {
            setError(error.response?.data?.error || error.message)
        }

    }
    return (
        <div className={Style.LoginContainer}>
            <form id="login"  onSubmit={(e) => toLogin(e)} >
                <div>{error}</div>
                <div className={Style.inputsContainer}>
                    <input  className={Style.input} id="email" type="text" name="email" placeholder="אימייל" required minLength="8" maxLength="40"/>
                    <input className={Style.input} id="password" type="password" name="password" placeholder="סיסמא" required />
                </div>


                <div className={Style.StayConnected}>
                    <input className={Style.checkbox} id="stayConnected" type="checkbox" name="stayConnected" />
                    <label className={Style.checkboxLabel} htmlFor="stayConnected">השאר אותי באתר</label>
                </div>

                <input className={Style.btn} type="submit" value="כניסה" />
            </form>
            <div className={Style.register}>לא רשומים? <span onClick={() => setRegisterState(true)}>הצטרפו אלינו!</span> </div>
        </div>
    )
}
