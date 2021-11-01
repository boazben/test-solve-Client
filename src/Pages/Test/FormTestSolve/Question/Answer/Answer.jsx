import React from 'react'
import Checkbox from '../../../../../Components/Checkbox/Checkbox'
import Style from './Answer.module.css'

export default function Answer({answer, index}) {
    const counter = ["א", "ב", "ג", "ד", "ה","ו", "ז", "ח","ט", "י"]
    return (
        <div className={Style.ansContainer}>
            <Checkbox id={`inp${answer._id}`} > {`${counter[index]}. ${answer.text}`}</Checkbox>
           
        </div>
    )
}
