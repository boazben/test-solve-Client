import React, { useRef } from 'react'
import TestInfoLine from '../TestInfoLine/TestInfoLine'
import Style from './TestToSolve.module.css'

export default function TestToSolve({test}) {
    const style = useRef({
        "In Doing" : Style.inDoing,
        "Not Open": Style.notOpen,
        "Done": Style.notOpen,
        "Closed": Style.inDoing
    })

    function formatTime(time) {
        let
          seconds = Math.floor((time / 1000) % 60),
          minutes = Math.floor((time / (1000 * 60)) % 60),
          hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      
        // hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        if (hours > 0) return ` ${hours}:${minutes}:${seconds} ש'`
        else return  `${minutes}:${seconds} דק'`
        
    }

    return (
        <div className={`${Style.container} ${style.current[test.status]}`}>
            {
                test.status.includes("In Doing") || test.status.includes("Not Open") ?
                <>
                    {test.status.includes("In Doing")? <h5>התחלת לפתור- הזמן אוזל!</h5> : null}
                    <TestInfoLine icon="fas fa-file-alt" status={test.status}>{test.test.name || `המבחן של ${test.test.creator.name.first}  ${test.test.creator.name.last}`}</TestInfoLine>
                    <TestInfoLine icon="fas fa-calendar-minus" status={test.status}>{test.test.deadline ? new Date(test.test.deadline).toLocaleDateString("en-GB") : 'אין תאריך הגשה'}</TestInfoLine>
                    <TestInfoLine icon="fas fa-chalkboard-teacher" status={test.status}>{`${test.test.creator.name.first}  ${test.test.creator.name.last}`}</TestInfoLine>
                    <TestInfoLine icon="fas fa-stopwatch" status={test.status}>{formatTime(test.test.timeForTest)}</TestInfoLine>
                </>
                : 
                <>
                    {test.status.includes("Closed")? <h5>עבר התאריך להגשת המבחן</h5> : null}
                    <TestInfoLine icon="fas fa-file-alt" status={test.status}>{test.test.name || `המבחן של ${test.test.creator.name.first}  ${test.test.creator.name.last}`}</TestInfoLine>
                    <TestInfoLine icon="fas fa-graduation-cap" status={test.status}>{"ציון" + " " + (test.grade || "0")}</TestInfoLine>
                    <TestInfoLine icon="fas fa-chalkboard-teacher" status={test.status}>{`${test.test.creator.name.first}  ${test.test.creator.name.last}`}</TestInfoLine>
                    <TestInfoLine icon="fas fa-calendar-minus" status={test.status}>{test.submissionDate ? new Date(test.submissionDate).toLocaleDateString("en-GB") : 'אין תאריך הגשה'}</TestInfoLine>
                </>
            }
        </div>
    )
}
