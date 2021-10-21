import React, { useContext, useState } from 'react'
import {Link, useHistory } from 'react-router-dom'
import { LoginState } from '../../App/App'
import { serverReq } from '../../functions'
import { UserContext } from '../Entrance'
import Checkbox from '../Input/Checkbox/Checkbox'
import Input from '../Input/Input'
import Style from './Login.module.css'


export default function Login({toRegister}) {
    
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState('')
    const [login, setLogin] = useContext(LoginState)
    const [registerState, setRegisterState] = toRegister
    const history = useHistory()


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
            history.push('/')
            
        } catch (error) {
            setError(error.response?.data?.error || error.message)
        }

    }
    return (
        <div className={Style.LoginContainer}>

            <h2 className={Style.headline}>התחברות</h2>


            <h3 className={Style.ask}>כבר יש לך חשבון? <span onClick={() => setRegisterState(true)} className={Style.toConnect}>התחברות</span></h3>

            <i className={`fas fa-user-lock ${Style.icon}`}></i>
            
           
            <form className={Style.form} id="login"  onSubmit={(e) => toLogin(e)} >
                
                <Input id="email" type="email" icon="fas fa-envelope" placeholder="אימייל" connect={true} />        
                <Input id="password" type="password" icon="fas fa-lock" placeholder="סיסמא" connect={true} />
                
                

                <Checkbox id="stayConnected" text="השאר אותי מחובר"  defaultChecked={true}/>


                <div>{error}</div>
                <input className={`${Style.btn} ${Style.submit}`} type="submit" value="התחברות" />

            </form>
        </div>
    )
}
