import React from 'react'
import Icon from '../../../../Components/Icon/Icon'
import Style from './Line.module.css'

export default function Line({children, icon}) {
    return (
        <div className={Style.container}>
            <div className={Style.iconWramp}><i className={icon}></i></div>
            <div className={Style.text}>{children}</div>
        </div>
    )
}
