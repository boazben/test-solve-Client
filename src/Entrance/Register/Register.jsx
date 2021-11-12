import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { LoginState } from '../../App/App';
import { serverReq } from '../../functions';
import { UserContext } from '../Entrance';
import Checkbox from '../Input/Checkbox/Checkbox';
import Input from '../Input/Input';
import Style from './Register.module.css'
import { GoogleLogin } from 'react-google-login'

export default function Register({toConnect}) {
    const [user, setUser] = useContext(UserContext)
    const [secssesRegister , setSecssesRegister] = useState(false)
    const [error, setError] = useState('')
    const [login, setLogin] = useContext(LoginState)
    const history = useHistory()
    const location = useLocation()
    const [registerState, setRegisterState] = toConnect


    async function register(e) {
        try {
            e.preventDefault()
            const values = Object.values(e.target)
                .reduce((acc, input) => !input.name ? acc : ({
                    ...acc,
                    [input.name]: input.type == 'checkbox' ? input.checked : input.value
                }), {}
                )
            if(values.password != values.verifyPassword) throw 'הסיסמא לא תואמת לוידוא סיסמא'
            const name = {
                first: values.firstName,
                last: values.lastName
            }
            console.log( values);
            const res = await serverReq('put', '/register', {"name": name, "email": values.email, "password": values.password})
            if (values.conntectNow) {
                sessionStorage.token = res.token
                if (values.stayConnected) localStorage.token = res.token
                setUser(res)
                setLogin(true)
                history.push(`${location.pathname}`)
            } 
            else setSecssesRegister(true)
            
        } catch (error) {
            //console.log(error.response);
            if (error.response?.data?.error.includes('user validation failed: email')) error.response.data.error = 'כתובת אימייל לא חוקית'
            setError(error.response?.data?.error || error.message || error)    
        }

    }
    return (
    <>
    {secssesRegister ? 
    <div className="Login">
        <h2>ההרשמה הצליחה!</h2>
        <button className={`${Style.btn} ${Style.toConnectNow}`} onClick={() => setRegisterState(false)}>היכנסו עכשיו</button> 
    </div> 
    :
    <form id="register" className={Style.formContainer} onSubmit={(e) => register(e)}>

        <h2 className={Style.headline}>הרשמה</h2>

        <h3 className={Style.ask}>כבר יש לך חשבון? <span onClick={() => setRegisterState(false)} className={Style.toConnect}>התחברות</span></h3>

        <Input id="firstName"  type="text" icon="fas fa-user" placeholder="שם פרטי" />        
        <Input id="lastName" type="text" icon="fas fa-users" placeholder="שם משפחה" />        
        <Input id="email" type="email" icon="fas fa-envelope" placeholder="אימייל" />        
        <Input id="password" type="password" icon="fas fa-lock" placeholder="סיסמא" />        
        <Input id="verifyPassword" type="password" icon="fas fa-key" placeholder="ווידוא סיסמא" />
        <Checkbox id="conntectNow" text="חבר אותי עכשיו" defaultChecked={true}/>        
        <Checkbox id="stayConnected" text="השאר אותי מחובר"  defaultChecked={false}/>

        <div className={Style.error}>{error}</div>

        <input className={`${Style.btn} ${Style.submit}`} type="submit" value="הרשמה" />

       


    </form>
    }

    </>
    )
}
