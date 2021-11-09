import React from 'react'
import Style from './Icon.module.css'

export default function Icon({icon, backgroundColor, color, size, fontSize, onClick, margin, style, text}) {
    return (
        <div className={Style.container} onClick={onClick}
        style={{
            backgroundColor: backgroundColor,
            width: size,
            height: size,
            color: color,
            fontSize: fontSize,
            margin: margin,
            ...style,
        }
        }>
            <i className={icon}></i>
            {text}
        </div>
    )
}
