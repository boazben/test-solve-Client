import React, { createContext, useContext, useState } from 'react'
import { PublishPopupContext } from '../TestForm'
import AddTester from './AddTester/AddTester'
import LinkForPublish from './LinkForPublish/LinkForPublish'
import Style from './Publish.module.css'
import Testers from './Testers/Testers'

export const ErrorContext = createContext()
export const TestersContext = createContext()

export default function Publish({state}) {
    const [publishPopup, setPublishPopup] = state
    const [errorMessage, setErrorMessage] = useState("")
    const [testers, setTesters] = useState([])

    function closed(e) {
        if (e.target === e.currentTarget) 
        setPublishPopup(false)
    }

    function exit() {
        setPublishPopup(false)
        setErrorMessage("")
    }
    return (
        <>
        {
            !publishPopup? null :
            <div className={Style.backgroundPopup} onClick={(e) => closed(e)}>
                <div className={Style.puplishDiv}>
                    <div className={Style.headerPuplishPopup}>
                        <div className={Style.exit} onClick={exit}><i className={"fas fa-times"}></i></div>                     
                        <h2 className={Style.title}>פרסום מבחן</h2>
                    </div>
                    <TestersContext.Provider value={ [testers, setTesters]} >
                        <AddTester errorState={[errorMessage, setErrorMessage]} />
                        {errorMessage && <div className={Style.errorMessage}>{errorMessage}</div>}
                        <Testers />
                    </TestersContext.Provider>
                    <h3>קישור להפצת המבחן</h3>
                    <LinkForPublish />
                </div>
            </div>
        }
        </>  
    )
}