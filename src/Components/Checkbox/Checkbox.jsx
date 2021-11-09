import React from 'react'
import Style from './Checkbox.module.css'

export default function Checkbox({id, children, defaultChecked=false, onClick, inputStyle, labelStyle}) {
    return (
        <div className={Style.container}>
            <input className={Style.checkbox} id={id} type="checkbox" name={id} defaultChecked={defaultChecked} onClick={onClick} style={inputStyle}/>
            <label className={Style.checkboxLabel} htmlFor={id} style={labelStyle}>{children}</label>
        </div>
    )
}
