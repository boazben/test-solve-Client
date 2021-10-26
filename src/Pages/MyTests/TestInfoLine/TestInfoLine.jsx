import React, { useRef } from 'react'
import Style from './TestInfoLine.module.css'

export default function TestInfoLine({children, icon, status}) {
    const style = useRef({
        "In Doing" : Style.inDoing,
        "Not Open": Style.notOpen,
        "Done": Style.notOpen,
        "Closed": Style.inDoing
    })
    return (
        <div className={Style.container}>
            <div className={`${Style.iconWarm} ${style.current[status]}`}><i className={icon}></i></div> <span>{children}</span>
        </div>
    )
}
