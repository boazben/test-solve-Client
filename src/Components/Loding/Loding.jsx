import React from 'react'
import './LodingStyle.css'

export default function Loding({text}) {
    return (
        <div className="LodingContainer">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            {text}
        </div>
        )
}
