import React, { useContext, useEffect, useState } from 'react'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import {TestersContext } from '../Publish'
import Tester from './Tester/Tester'
import Style from './Testers.module.css'

export default function Testers() {
    const [testers, setTesters] = useContext(TestersContext)
    const [test, setTest] = useContext(TestFormContext)

    useEffect(() => {
        getTesters(test._id)
    }, [])

    async function getTesters(idTest) {
        try {
        const res = await serverReq('post', '/get_testers', {"id": idTest})
        console.log(res);
        setTesters(res)
            
        } catch (error) {
            // console.log(error.response?.data?.error || error.message)
            // console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)

        } 
        
    }

    return (
        <div className={Style.container}>
        {
            testers.length == 0 ? <div className={Style.massage}><i className={`fas fa-users ${Style.icon}`}></i><h4>המבחן עוד לא הופץ</h4></div> :
            testers.map(tester => {
                return (
                    <Tester key={tester._id} user={tester}/>
                )
            })
            
        }
         </div>
        
    )
}
