import React, { useContext, useState } from 'react'
import { serverReq } from '../../../functions'
import { PublishPopupContext, TestFormContext } from '../TestForm'
import MenuTestDeadlineForm from './MenuTestDeadlineForm/MenuTestDeadlineForm'
import Style from './MenuTestForm.module.css'
import MenuTestNameForm from './MenuTestNameForm/MenuTestNameForm'
import MenuTestTimerForm from './MenuTestTimerForm/MenuTestTimerForm'

export default function MenuTestForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [popup, setPopup] = useContext(PublishPopupContext)

    function openPopup() {
        setPopup(true)
    }

   
    return (
        <div className={Style.menuContainer}>
            <MenuTestNameForm />
            <MenuTestDeadlineForm />
            <MenuTestTimerForm />
            <div>סטטוס: {test.status_he || "לא התקבל סטטוס"}</div>
            <div className={Style.butMenuFormContainer}>
                <button className={Style.publishBut} onClick={openPopup}>פרסם מבחן</button>
            </div>
            <div></div>
            <div></div>
            
        </div>
    )
}
