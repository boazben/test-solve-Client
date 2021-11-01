import React from 'react'
import Style from './Checkbox.module.css'

export default function Checkbox({id, children, defaultChecked=false}) {
    return (
        <div className={Style.container}>
            <input className={Style.checkbox} id={id} type="checkbox" name={id} defaultChecked={defaultChecked}/>
            <label className={Style.checkboxLabel} htmlFor={id}>{children}</label>
        </div>
    )
}
