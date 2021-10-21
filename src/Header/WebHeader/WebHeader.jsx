import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'
import { LoginState } from '../../App/App'
import UserHeader from '../UserHeader/UserHeader'
import Style from './WebHeader.module.css'

export default function WebHeader() {
    const [login] = useContext(LoginState)
    return (
        <header className={Style.header}>
            
            <Link className={`${Style.logoContainer}`} to="/">
                <div className={`${Style.logoTextContainer}`}>
                    <div className={`${Style.name} `}>TESTUDY</div>
                    <div className={`${Style.description} `}>Education</div>
                </div>
                <div className={`${Style.logo}`}>
                    <i className="fas fa-university"></i>
                </div>
            </Link>

            <nav className={Style.nav}>
                <NavLink activeClassName={Style.Linkactive} className={Style.Link} to="/my-created">יצירת מבחנים</NavLink>
                <NavLink activeClassName={Style.Linkactive} className={Style.Link} to="/my-tests" >המבחנים שלי</NavLink>
                <NavLink activeClassName={Style.Linkactive} className={Style.Link} to='/website-information' >על הפרויקט</NavLink>
                <NavLink activeClassName={Style.Linkactive} className={Style.Link} to='/about' >מי אנחנו?</NavLink>
                <NavLink activeClassName={Style.Linkactive} className={Style.Link} to='/register' >כניסה</NavLink>
            </nav>
            
        </header>
    )
}
