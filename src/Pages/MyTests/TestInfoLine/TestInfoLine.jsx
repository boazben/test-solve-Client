import React, { useRef } from 'react'
import Style from './TestInfoLine.module.css'

export default function TestInfoLine({children, icon, status, column=false}) {
    const style = useRef({
        "In Doing" : Style.inDoing,
        "Not Open": Style.notOpen,
        "Done": Style.notOpen,
        "Closed": Style.inDoing,
        "reguler": Style.notOpen
    })
    return (
        <div className={`${Style.container} ${column && Style.column}`}>
            <div className={`${Style.iconWarm} ${style.current[status]}`}><i className={icon}></i></div> <span>{children}</span>
        </div>
    )
}
