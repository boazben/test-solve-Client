import React, { createContext, useContext, useState } from 'react'
import { serverReq } from '../../../functions'
import { SolverTesContext } from '../Test'
import Style from './FormTestSolve.module.css'
import PopupMessage from './PopupMessage/PopupMessage'
import Question from './Question/Question'

export const PopupMessageContext = createContext()

export default function FormTestSolve() {
    const [obj, setObj] = useContext(SolverTesContext)
    const [popup, setPopup] = useState(false)

    function openPopup(e) {
        e.preventDefault()
        setPopup(true)
    }

    

    return (
        <div className={Style.formContainer}>
            <div className={Style.questionsContainer}>
                <div className={Style.questenContainer}>
                {
                    obj.questens.map((question, index) => {
                        return <Question question={question} index={index} key={index} />
                    })
                }
                </div>
            </div>
            <button className={Style.btn} onClick={e => openPopup(e)}> הגשת מבחן </button>
            <PopupMessageContext.Provider value={[popup, setPopup]} >
                <PopupMessage  />
            </ PopupMessageContext.Provider>
        </div>
    )
}
