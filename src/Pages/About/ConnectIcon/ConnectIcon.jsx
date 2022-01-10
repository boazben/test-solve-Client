import React from 'react'
import Style from './ConnectIcon.module.css'

export default function ConnectIcon({children, icon}) {
    return (
        <div className={Style.container}>
            <div className={Style.iconsContainer}>
                <i className={icon}></i>
            </div>
            <h5 className={Style.text}>{children}</h5>
        </div>
    )
}
