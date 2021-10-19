import React from 'react'
import { useState } from 'react/cjs/react.development'
import Style from './Popup.module.css'

// A regolar massege popup.

export default function Popup({title, message, btnText, state}) {
    const [popup, setPopup] = state
    
    function disappear(e) {
        if (e.target === e.currentTarget)  setPopup(false)
    }

    function exit() {
        setPopup(false)
    }

    return (
        <div className={Style.background} onClick={e => disappear(e)}>
            <div className={Style.messageDiv}>
                <div className={Style.header}>
                    <div className={Style.exit} onClick={exit}><i className={"fas fa-times"}></i></div>                     
                    <h2 className={Style.title}>{title}</h2>
                </div>
                {/* <div className={Style.denger}></div> */}
                <div className={Style.message}>
                   <p>{message}</p>
                </div>
                <div className={Style.btnsContainer}>
                    <button className={Style.btn} onClick={exit}>{btnText}</button>
                </div>
            </div>
        </div>
       
    )
}
