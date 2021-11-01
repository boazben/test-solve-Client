import React, { useContext } from 'react'
import TestInfoLine from '../../../MyTests/TestInfoLine/TestInfoLine'
import { SolverTesContext } from '../../Test'
import Style from './TestSolvedInfo.module.css'

export default function TestSolvedInfo() {
    const [obj, setobj] = useContext(SolverTesContext)
    return (
        <div className={Style.container}>
            <TestInfoLine icon="fas fa-file-alt"  status={"reguler"}>{obj.test.name || `המבחן של ${obj.test.creator.name.first}  ${obj.test.creator.name.last}`}</TestInfoLine>
            <TestInfoLine icon="fas fa-chalkboard-teacher"  status={"reguler"}>{`${obj.test.creator.name.first}  ${obj.test.creator.name.last}`}</TestInfoLine>
            <TestInfoLine icon="fas fa-graduation-cap"  status={"reguler"}>{obj.grade ? `ציון ${obj.grade}`: 'ציון 0'}</TestInfoLine>
            <TestInfoLine icon="fas fa-calendar-minus"  status={"reguler"}>{obj.submissionDate ? `הוגשב ב- ${new Date(obj.submissionDate).toLocaleDateString("en-GB")}` : 'אין תאריך הגשה'}</TestInfoLine>
        </div>
    )
}
