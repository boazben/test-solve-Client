import React, { useContext, useEffect, useState } from 'react'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import {TestersContext } from '../Publish'
import Tester from './Tester/Tester'
import TesStyle from './Testers.module.css'

export default function Testers() {
    const [testers, setTesters] = useContext(TestersContext)
    const [test, setTest] = useContext(TestFormContext)

    useEffect(() => {
        getTesters(test._id)
    }, [])

    async function getTesters(idTest) {
        try {
        const res = await serverReq('post', '/get_testers', {"id": idTest})
        setTesters(res)
            
        } catch (error) {
            console.log(error.response?.data?.error || error.message)
        } 
        
    }

    return (
        <div className={TesStyle.container}>
        {
            testers.length == 0 ? <div className={TesStyle.massage}>עדיין אין נבחנים</div> :
            testers.map(tester => {
                return (
                    <Tester key={tester._id} user={tester}/>
                )
            })
        }
         </div>
        
    )
}
