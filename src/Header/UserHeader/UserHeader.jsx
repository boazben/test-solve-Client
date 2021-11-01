import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { LoginState } from '../../App/App'
import { UserContext } from '../../Entrance/Entrance'
import { serverReq } from '../../functions'
import DropdownItem from './DropdownItem/DropdownItem'
import Style from './UserHeader.module.css'

export default function UserHeader() {
    const user = useContext(UserContext)
    const [login, setLogin] = useContext(LoginState)
    const history = useHistory()
    const[open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState(0)

    useEffect(() => {
        async function getTests() {
            try {
              const tests = await serverReq('post', '/my_tests')
             const num = tests.filter(test => test.status === "Not Open").length
                setNotifications(num)
            } catch (error) {
              throw error
              // console.log(error.response?.data?.error || error.message || error);
            }
          }
          getTests()

          return () => {
            setNotifications(0)
          }
    }, [])

    function logout() {
        localStorage.removeItem("token");
        sessionStorage.removeItem('token');
        setLogin(false)
        history.push('/')
    }

    async function newTest() {
        try {
            // Creat new test:
            const test = await serverReq('put', '/create_test')
            // go to the test-form page with the id of the new test:
            history.push(`/test-form/${test._id}`)
        } catch (error) {
            console.log(error.response?.data?.error || error.message || error);
        }
    }


    return (
        <>
            {
                !login ? null:
                <div className={Style.navUser}>

                    <div className={`${Style.dropdown} ${open ? Style.open : Style.close}`} onClick={() => setOpen(!open)}>
                        <i className="fas fa-sort-down"></i>
                        {
                            open ? 
                            <>
                            <div className={Style.screen}>
                            </div>
                                <div className={Style.dropdownOpen}>
                                    <div onClick={() => newTest()}>
                                        <DropdownItem icon="fas fa-plus">יצירת מבחן חדש</DropdownItem>
                                    </div>
                                    <DropdownItem icon="fas fa-pencil-alt" toPage="/my-tests">פתירת מבחן</DropdownItem>
                                    <DropdownItem icon="fas fa-file-alt" toPage="/my-created">מבחנים שיצרתי</DropdownItem>
                                    <DropdownItem icon="fas fa-cog" toPage="/my-created">הגדרות חשבון</DropdownItem>
                                    <div  onClick={() => logout()}>
                                        <DropdownItem icon="fas fa-sign-out-alt" >יציאה מהמערכת</DropdownItem>
                                    </div>
                                </div>
                            </>
                            :
                            null
                        }
                    </div>

                    <Link to="/my-tests" className={Style.notifications}>
                        {
                            notifications ? 
                            <div className={Style.No}>{notifications}</div>
                            : null

                        }
                        <i className="fas fa-bell"></i>
                    </Link>

                    <Link to="/profile-sitting" className={Style.userImgContainer}>
                        <div className={Style.userImg}>
                            <i className="fas fa-user"></i>
                        </div>
                        <span className={Style.userName}>{`${user[0].name.first} ${user[0].name.last}`}</span>
                    </Link>
                </div>
            }

        </>
    )
}