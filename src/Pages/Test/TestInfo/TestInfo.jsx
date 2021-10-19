import React, { useContext } from 'react'
import Timer from '../../../Components/Timer/Timer'
import { SolverTesContext } from '../Test'
import Style from './TestInfo.module.css'

export default function TestInfo() {
    const [obj, setObj] = useContext(SolverTesContext)

    return (
        <div className={Style.container}>
            <div className={Style.examines}> 
                <div className={Style.examinesImg} style={{ backgroundImage: `url(${obj?.test?.creator?.profilePicture || 'https://hook.finance/sites/default/files/user.png'})` }}></div>
                <div className={Style.examinesName}>{`${obj?.test?.creator?.name?.first} ${obj?.test?.creator?.name?.last}`}</div>
            </div>
            <div className={Style.testName}>{obj?.test?.name}</div>
            <div> זמן:</div>
            <div><Timer /></div>
        </div>
    )
}
