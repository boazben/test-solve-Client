import React, { useContext, useEffect, useRef, useState } from 'react'
import { SolverTesContext, SubmitContext } from '../../Pages/Test/Test'
import Style from './Timer.module.css'

export default function Timer() {
    const [obj, setObj] = useContext(SolverTesContext)
    const [time, setTime] = useState(0)
    let interval = useRef()
    const submitInput = useContext(SubmitContext)
    
    function startTimer() {
        interval.current = setInterval(changeTime, 1000)
    }

    

    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    function changeTime() {
        const {endDate} = obj
        let localTime = endDate - Date.now()
        if (localTime <= 0) {
            console.log('The time over!'); 
            clearInterval(interval.current)
            submitInput.current.requestSubmit() 
            
        }
        else {
            console.log('The timer running');
            setTime(localTime)
        }
    }

    function formatTime(time) {
    let
      seconds = Math.floor((time / 1000) % 60),
      minutes = Math.floor((time / (1000 * 60)) % 60),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds
    }
    

    
    return (
        <div>
            {formatTime(time)}
            <input type="submit" value=""  className={Style.submit}/>
        </div>
    )
}
