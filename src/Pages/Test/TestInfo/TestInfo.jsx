import React, { useContext, useEffect, useRef, useState } from 'react'
import Timer from '../../../Components/Timer/Timer'
import TestInfoLine from '../../MyTests/TestInfoLine/TestInfoLine'
import { SolverTesContext } from '../Test'
import Style from './TestInfo.module.css'
import WidthScreen from '../../../App/App'

export default function TestInfo() {
    const [obj, setObj] = useContext(SolverTesContext)
    const [width, setWidth] = useState(window.innerWidth)
    const start = useRef(
        !obj.test ?
        obj : obj.test
    )
    
    useEffect(() => {
        const getWidth = () => {
            console.log(window.innerWidth);
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', getWidth)
        
        return () => {
            window.removeEventListener('resize', getWidth)
        }
    }, [])

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
        <div className={`${Style.container} `}>
            {
                (obj.test && obj.status.includes("In Doing")) || !obj.test?
                <>
                    <div id={Style.name}>
                    <TestInfoLine icon="fas fa-file-alt" status={"reguler"} column={width > 768 && true} >{start.current.name || `המבחן של ${start.current.creator.name.first}  ${start.current.creator.name.last}`}</TestInfoLine></div>
                    
                    <div id={Style.creator}>
                    <TestInfoLine icon="fas fa-chalkboard-teacher" status={"reguler"} column={width > 768 && true}>{`${start.current.creator.name.first}  ${start.current.creator.name.last}`}</TestInfoLine></div>
                    
                    <div id={Style.timer}>
                    <span className={Style.bold}><TestInfoLine icon="fas fa-stopwatch" status={"reguler"} column={width > 768 && true}><Timer /></TestInfoLine></span></div>
                </>
                : 
                <>
                    {obj.status.includes("Closed")? <h5>עבר התאריך להגשת המבחן</h5> : null}
                    <div className={Style.testName}><TestInfoLine icon="fas fa-file-alt" status={obj.status}>{obj.test.name || `המבחן של ${obj.test.creator.name.first}  ${obj.test.creator.name.last}`}</TestInfoLine></div>
                    <div className={Style.testCreator}><TestInfoLine icon="fas fa-chalkboard-teacher" status={obj.status}>{`${obj.test.creator.name.first}  ${obj.test.creator.name.last}`}</TestInfoLine></div>
                    <div className={Style.testGrade}><TestInfoLine icon="fas fa-graduation-cap" status={obj.status}>{"ציון" + " " + (obj.grade || "0")}</TestInfoLine></div>
                    <div className={Style.testDate}><TestInfoLine icon="fas fa-calendar-minus" status={obj.status}>{obj.submissionDate ? new Date(obj.submissionDate).toLocaleDateString("en-GB") : 'אין תאריך הגשה'}</TestInfoLine></div>
                </>
            }
        </div>
    

        // <div className={Style.container}>
        //     <div className={Style.examines}> 
        //         <div className={Style.examinesImg} style={{ backgroundImage: `url(${obj?.test?.creator?.profilePicture || 'https://hook.finance/sites/default/files/user.png'})` }}></div>
        //         <div className={Style.examinesName}>{`${obj?.test?.creator?.name?.first} ${obj?.test?.creator?.name?.last}`}</div>
        //     </div>
        //     <div className={Style.testName}>{obj?.test?.name}</div>
        //     <div> זמן:</div>
        //     <div><Timer /></div>
        // </div>
    )
}
