import React from 'react'
import DropdownItem from '../../../Header/UserHeader/DropdownItem/DropdownItem'
import MenuTestDeadlineForm from '../MenuTestForm/MenuTestDeadlineForm/MenuTestDeadlineForm'
import MenuTestLink from '../MenuTestForm/MenuTestLink/MenuTestLink'
import MenuTestTimerForm from '../MenuTestForm/MenuTestTimerForm/MenuTestTimerForm'
import Style from './TestSetting.module.css'

export default function TestSetting() {
    return (
        <>
        {/* <div className={Style.screen}>
        </div> */}
            <div className={Style.dropdownContainer}>
                <div className={Style.dropdownItem} title="דד-ליין">
                        <MenuTestDeadlineForm />
                </div>
                <div className={Style.dropdownItem} title="זמן לפתירת מבחן">
                        <MenuTestTimerForm />
                </div>
                <div className={Style.dropdownItem} title="הגדרת הפצה">
                        <MenuTestLink />
                </div>
            </div>
        </>
    )
}
