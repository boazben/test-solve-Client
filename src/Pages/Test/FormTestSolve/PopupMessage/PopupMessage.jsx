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
                    <div className={Style.denger}><i className="fas fa-exclamation-triangle"></i></div>
                    <div className={Style.message}>
                        <p>לאחר הגשת המבחן לא ניתן לשנות את התשובות </p>
                    </div>
                    <div className={Style.btnsContainer}>
                        <button className={`${Style.btn} ${Style.disallow}`} onClick={exit}>אני רוצה לחזור לבמחן</button>
                        <input type="submit" value="אוקיי, ברצוני להגיש"  className={`${Style.btn} ${Style.allow}`}/>
                    </div>
                </div>
            </div>
        }
        </>  
    )
}