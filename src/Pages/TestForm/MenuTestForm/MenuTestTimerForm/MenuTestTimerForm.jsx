import React, { useRef } from 'react'
import { useContext, useState } from 'react';
import Popup from '../../../../Components/Popup/Popup';
import { serverReq } from '../../../../functions';
import { LodingContext, TestFormContext } from '../../TestForm';
import Style from './MenuTestTimerForm.module.css';
import TimeForm from './TimeForm/TimeForm';

export default function MenuTestTimerForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [generalLoding, setGeneralLoding] = useContext(LodingContext)
    const [seconds_state, setSeconds_state] = useState('text')
    const [minutes_state, setMinutes_state] = useState('text')
    const [hours_state, setHours_state] = useState('text')
    const [popup, setPopup] = useState(false)


    const seconds = useRef()
    const minutes = useRef()
    const hours = useRef()

    const secondsInput = useRef()
    const minutesInput = useRef()
    

    function change(timeType) {
        if (test.status.includes('Started') || test.status.includes('Closed')) {
        } else {
            let newState
            switch (timeType) {
                case 'seconds':
                        newState =  seconds_state === 'text' ? 'input' : 'text'
                        setSeconds_state(newState)
                    break;

                case 'minutes':
                        newState =  minutes_state === 'text' ? 'input' : 'text'
                        setMinutes_state(newState)
                    break;

                case 'hours':
                        newState =  hours_state === 'text' ? 'input' : 'text'
                        setHours_state(newState)
                    break;
            
                default:
                    throw 'Error: the time type not good'
                    break;
            }
        }
    }

    function toSubmit(timeType) {
        switch (timeType) {
            case 'seconds':
                seconds.current.requestSubmit()
                break;

            case 'minutes':
                minutes.current.requestSubmit()
                break;

            case 'hours':
                hours.current.requestSubmit()
                break;
        
            default:
                throw 'Error: the time type not good'
                break;
        }
    }
    

    async function saveSeconds(e) {
        e.preventDefault()
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {})
        try {
            const seconds = Number(values.seconds)
            let currentTime = test.timeForTest
            if (!currentTime) currentTime = 0
            let currentSeconds = (currentTime / 1000 ) % 60
            const updateTime = currentTime - (currentSeconds * 1000) + (seconds * 1000)
            setGeneralLoding(true)
            const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"timeForTest": updateTime}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            console.log('res:', res);
            setTest(res)
            change('seconds') 
            setGeneralLoding(false)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    async function saveMinutes(e) {
        e.preventDefault()
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {})
        try {
            const minutes = Number(values.minutes)
            let currentTime = test.timeForTest
            if (!currentTime) currentTime = 0
            const seconds = (currentTime / 1000) % 60
            const currentMinutes = ((currentTime / 1000 - seconds) / 60 ) % 60
            const updateTime = (currentTime - (currentMinutes * 60 * 1000) + (minutes * 60 * 1000))
            console.log('updateTime:', updateTime);
            console.log();
            setGeneralLoding(true)
            const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"timeForTest": updateTime}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            console.log('minutesRes:', res);
            setTest(res)
            change('minutes') 
            setGeneralLoding(false)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    async function saveHours(e) {
        e.preventDefault()
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {})
        try {
            const hours = Number(values.hours)
            let currentTime = test.timeForTest
            if (!currentTime) currentTime = 0
            const currentHours = Math.floor(currentTime / 1000 / 3600)
            const updateTime = (currentTime - (currentHours * 3600 * 1000) + (hours * 3600 * 1000))
            console.log('updateTime:', updateTime);
            console.log();
            setGeneralLoding(true)
            const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"timeForTest": updateTime}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            console.log('minutesRes:', res);
            setTest(res)
            change('hours') 
            setGeneralLoding(false)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    

    function toPreviwTimer(millisec, type) {
        if (!millisec) return '00'
        let seconds, minutes, hours, res
        seconds = (millisec / 1000) % 60


        switch (type) {
            case 'seconds':
                res = seconds
                if (res < 10 ) res = '0' + res
                return res

            case 'minutes':
                res = ((millisec / 1000 - seconds) / 60 ) % 60
                if (res < 10 ) res = '0' + res
                return res
                break;

            case 'hours':
                res = Math.floor(millisec / 1000 / 3600)
                if (res < 10 ) res = '0' + res
                   return res
                break;
        
            default:
                throw 'Error: the time type not good'
                break;
        }
    }
 
    return (
        <div className={Style.container}>
        <i className={`fas fa-hourglass-half ${Style.clock}`}></i>
        <div className={Style.timeContainer}>
            {
                seconds_state === 'text' ? 
                <div className={Style.spans}>
                    <span className={Style.timeText} onClick={() => change('seconds')}>{toPreviwTimer(test.timeForTest, 'seconds')}</span> 
                    <span className={Style.label}>שניות</span>
                </div>
                : 
                <form ref={seconds} onSubmit={e => saveSeconds(e)} >
                    <input ref={secondsInput} name="seconds"  min={0} max={59} onFocus={e => e.target.select()} className={Style.timeInput} type="number" autoFocus onBlur={() => toSubmit('seconds')} onKeyDown={(e) => e.key === 'Enter' && toSubmit('seconds')}/>  
                </form>
            } 
            :   
            {
                minutes_state === 'text' ? 
                <div className={Style.spans}>
                    <span className={Style.timeText} onClick={() => change('minutes')}>{toPreviwTimer(test.timeForTest, 'minutes')}</span> 
                    <span className={Style.label}>דקות</span>
                </div>
                :
                <form ref={minutes} onSubmit={e => saveMinutes(e)} >
                    <input ref={minutesInput} name="minutes"  min={0} max={59} onFocus={e => e.target.select()} className={Style.timeInput} type="number" autoFocus onBlur={() => toSubmit('minutes')} onKeyDown={(e) => e.key === 'Enter' && toSubmit('minutes')}/>  
                </form>
            }
            :
            {
                hours_state === 'text' ? 
                <div className={Style.spans}>
                    <span className={Style.timeText} onClick={() => change('hours')}>{toPreviwTimer(test.timeForTest, 'hours')}</span>
                    <span className={Style.label}>שעות</span>
                </div>
             : 
            <form ref={hours} onSubmit={e => saveHours(e)} >
                <input id="hours" name="hours" min={0} max={10} onFocus={e => e.target.select()} className={Style.timeInput} type="number" autoFocus onBlur={() => toSubmit('hours')} onKeyDown={(e) => e.key === 'Enter' && toSubmit('hours')}/>  
            </form>
            } 
        </div>
    </div>
    )
}
