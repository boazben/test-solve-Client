import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginState } from '../../App/App'
import UserHeader from '../UserHeader/UserHeader'
import Style from './MobileHeader.module.css'

export default function MobileHeader() {
    const [menu, setMenu] = useState(false)
    const [login] = useContext(LoginState)

    return (
        <header className={Style.container}>
            {
                menu ?
                <div className={Style.menuOpen}>
                <div className={Style.menu} onClick={() => setMenu(false)}><i className="fas fa-times"></i></div>
                <div className={Style.LinksContainer}>
                    <Link className={Style.Link} onClick={() => setMenu(false)} to="/my-created">יצירת מבחנים</Link>
                    <Link className={Style.Link} onClick={() => setMenu(false)} to="/my-tests" >המבחנים שלי</Link>
                    <Link className={Style.Link} onClick={() => setMenu(false)} to='/website-information' >על הפרוייקט</Link>
                    <Link className={Style.Link} onClick={() => setMenu(false)}  to='/about' >מי אנחנו?</Link>
                    {
                        !login ?
                        <Link className={Style.Link} onClick={() => setMenu(false)}  to='/register' >כניסה</Link>
                        : null

                    }
                </div>

                    <div className={`${Style.logoContainer} ${Style.logoContainerOpen}`}>
                        <div className={`${Style.logo} ${Style.logoOpen}`}>
                            <i className="fas fa-university"></i>
                        </div>
                        <div className={`${Style.logoTextContainer}`}>
                            <div className={`${Style.name} ${Style.nameOpen}`}>TESTUDY</div>
                            <div className={`${Style.description} ${Style.descriptionOpen}`}>Education</div>
                        </div>
                    </div>
                </div>
                :
                <>
                <div className={Style.menu} onClick={() => setMenu(true)}><i className="fas fa-bars"></i></div>
                <UserHeader />
                <Link className={Style.logoContainer} to="/">
                    <div className={Style.logoContainer}>
                        <div className={Style.logoTextContainer}>
                            <div className={Style.name}>TESTUDY</div>
                            <div className={Style.description}>Education</div>
                        </div>
                        <div className={Style.logo}>
                            <i className="fas fa-university"></i>
                            </div>
                    </div>
                </Link>
                </>
            }
        </header>
            
    )
}
