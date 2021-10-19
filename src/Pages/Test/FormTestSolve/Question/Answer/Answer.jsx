import React from 'react'
import Style from './Answer.module.css'

export default function Answer({answer, index}) {
    const counter = ["א", "ב", "ג", "ד", "ה","ו", "ז", "ח","ט", "י"]
    return (
        <div className={Style.container}>
            <input type="checkbox" name={`${answer._id}`} id={`inp${answer._id}`} />
            <label htmlFor={`inp${answer._id}`} className={Style.label}>
                <div>{counter[index]}.</div>
                 <div className={Style.text}>{answer.text}</div>
            </label> 
        </div>
    )
}
