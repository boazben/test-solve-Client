import React from 'react'
import { useState } from 'react/cjs/react.development'
import Style from './Popup.module.css'

// A regolar massege popup.

export default function Popup({title, message, backText, btnText, state, func=false, info, icon=false}) {
    const [popup, setPopup] = state
    
    function closed(e) {
        if (e.target === e.currentTarget)  setPopup(false)
    }

    function doEction() {
        setPopup(false)
        console.log(info);
        func(info)
    }



    return (
        <div className={Style.backgroundPopup} onClick={(e) => closed(e)}>
                <div className={Style.puplishDiv}>
                    <div className={Style.headerPopup}>
                        <div className={Style.exitPopup} onClick={() => setPopup(false)}><i className={"fas fa-times"}></i></div>                     
                        <h2 className={Style.titelPopup}>{title}</h2>
                    </div>
                    {icon && <div className={Style.icon}><i className={icon}></i></div>}
                    <div className={Style.message}>
                        <p>{message}</p>
                    </div>
                    <div className={Style.btnsContainer}>
                        <button className={`${Style.btn} ${Style.allow}`} onClick={() => setPopup(false)}>{backText}</button>
                        { func && <button className={`${Style.btn} ${Style.disallow}`} onClick={doEction}>{btnText}</button>}
                    </div>
                </div>
            </div>
       
    )
}
