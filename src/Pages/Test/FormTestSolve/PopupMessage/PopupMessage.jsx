import React, { createContext, useContext, useState } from 'react'
import { PopupMessageContext } from '../FormTestSolve'
import Style from './PopupMessage.module.css'
export const ErrorContext = createContext()
export const TestersContext = createContext()

export default function PopupMessage({text}) {
    const [popup, setPopup] = useContext(PopupMessageContext)
    const [errorMessage, setErrorMessage] = useState("")
    const [testers, setTesters] = useState([])

    function closed(e) {
        if (e.target === e.currentTarget) 
        setPopup(false)
    }

    function exit() {
        setPopup(false)
        setErrorMessage("")
    }
    return (
        <>
        {
            !popup? null :
            <div className={Style.backgroundPopup} onClick={(e) => closed(e)}>
                <div className={Style.puplishDiv}>
                    <div className={Style.headerPuplishPopup}>
                        <div className={Style.exitPuplishPopup} onClick={exit}><i className={"fas fa-times"}></i></div>                     
                        <h2 className={Style.titelPuplishPopup}>הגשת מבחן</h2>
                    </div>
                    <div className={Style.denger}></div>
                    <div className={Style.message}>
                        <p>יש לשים לב!</p>
                        <p>לאחר הגשת המבחן, לא ניתן לבצע שינויים במבחן.</p>
                        <p>האם ברצונך להגיש בכל זאת?</p>
                    </div>
                    <div className={Style.btnsContainer}>
                        <input type="submit" value="כן, ברצוני להגיש"  className={Style.btn}/>
                        <button className={Style.btn} onClick={exit}>לא, ברצוני להמשיך</button>
                    </div>
                </div>
            </div>
        }
        </>  
    )
}