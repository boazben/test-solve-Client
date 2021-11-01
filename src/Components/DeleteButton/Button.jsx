import React, { useContext } from 'react'
import { TestFormContext } from '../../Pages/TestForm/TestForm'
import Style from './Button.module.css'

export default function Button({ children ,circle=false}) {

    
    return (
        <div className={`${Style.button} ${circle && Style.circle}`}>
            {children}
        </div>
    )
}
