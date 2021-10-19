import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { LoginState } from '../../App/App';
import { serverReq } from '../../functions';
import { UserContext } from '../Entrance';

export default function Register({toConnect}) {
    const [user, setUser] = useContext(UserContext)
    const [secssesRegister , setSecssesRegister] = useState(false)
    const [error, setError] = useState('')
    const [login, setLogin] = useContext(LoginState)
    const history = useHistory()
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
            const res = await serverReq('put', '/register', {"name": name, "email": values.email, "password": values.password})
            if (values.conntectNow) {
                sessionStorage.token = res.token
                if (values.stayConnected) localStorage.token = res.token
                setUser(res)
                setLogin(true)
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
        <button onClick={() => setRegisterState(false)}>התחבר עכשיו</button> 
    </div> 
    :
    <form id="register" className="Login" onSubmit={(e) => register(e)}>
        <div>{error}</div>

        <label htmlFor="firstName">שם פרטי</label>
        <input id="firstName" type="text" name="firstName" placeholder="שם פרטי" required minLength="2" maxLength="12"/>

        <label htmlFor="lastName">שם משפחה</label>
        <input id="lastName" type="text" name="lastName" placeholder="שם משפחה" required minLength="2" maxLength="12"/>

        <label htmlFor="email">אימייל</label>
        <input id="email" type="email" name="email" placeholder="אימייל" required/>

        <label htmlFor="password">סיסמא</label>
        <input id="password" type="password" name="password" placeholder="סיסמא" required minLength="8" maxLength="40"/>
        
        <label htmlFor="verifyPassword">ווידוא סיסמא</label>
        <input id="verifyPassword" type="password" name="verifyPassword" placeholder="וידוא סיסמא" required minLength="8" maxLength="40"/>

        <div>
            <input id="conntectNow" type="checkbox" name="conntectNow" defaultChecked={true}/>
            <label htmlFor="conntectNow">חבר אותי עכשיו</label>
        </div>

        <div>
            <input id="stayConnected" type="checkbox" name="stayConnected"/>
            <label htmlFor="stayConnected">השאר אותי מחובר</label>
        </div>


        <input type="submit" value="הירשם" />
    </form>

    }
    </>
    )
}
