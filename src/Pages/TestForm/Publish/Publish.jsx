import React, { createContext, useContext, useState } from 'react'
import { PublishPopupContext } from '../TestForm'
import AddTester from './AddTester/AddTester'
import PubCSS from './Publish.module.css'
import Testers from './Testers/Testers'

export const ErrorContext = createContext()
export const TestersContext = createContext()

export default function Publish() {
    const [publishPopup, setPublishPopup] = useContext(PublishPopupContext)
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
            <div className={PubCSS.backgroundPopup} onClick={(e) => closed(e)}>
                <div className={PubCSS.puplishDiv}>
                    <div className={PubCSS.headerPuplishPopup}>
                        <div className={PubCSS.exitPuplishPopup} onClick={exit}><i className={"fas fa-times"}></i></div>                     
                        <h2 className={PubCSS.titelPuplishPopup}>פרסום מבחן</h2>
                    </div>
                    <TestersContext.Provider value={ [testers, setTesters]} >
                        <ErrorContext.Provider value={[errorMessage, setErrorMessage]} >
                                <AddTester />
                        </ErrorContext.Provider>
                        {errorMessage ? <div className={PubCSS.errorMessage}>{errorMessage}</div> : null}
                        <h3 className={PubCSS.subheading}>נבחנים</h3>
                        <Testers />
                    </TestersContext.Provider>
                </div>
            </div>
        }
        </>  
    )
}