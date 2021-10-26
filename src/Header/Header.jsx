import React, { useContext, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { LoginState, WidthScreen } from '../App/App'
import MobileHeader from './MobileHeader/MobileHeader'
import WebHeader from './WebHeader/WebHeader'

export default function Header() {
    const [width, setWidth] = useContext(WidthScreen)
    const [login, setLogin] = useContext(LoginState)
    const history = useHistory()

    function logout() {
        localStorage.removeItem("token");
        sessionStorage.removeItem('token');
        setLogin(false)
        history.push('/')
    }
   

    return (
        <>
        {
            width < 769 ? 
            <MobileHeader logout={logout} />
            : <WebHeader logout={logout}/>
        }
        </>
    )
}
