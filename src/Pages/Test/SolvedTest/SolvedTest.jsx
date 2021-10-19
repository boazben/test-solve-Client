import React, { useEffect, useState } from 'react'
import FormTestSolve from '../FormTestSolve/FormTestSolve'
import TestInfo from '../TestInfo/TestInfo'
import QuestionSolve from './QuestionSolve/QuestionSolve'
import Style from './SolvedTest.module.css'

export default function SolvedTest({obj}) {
    // console.log('SolvedTest:');
    // console.log(obj);

    return (
        <div className={Style.container}>
            <header className={Style.info}>
                <h1>המבחן הוגש</h1>
                <h2><span className={Style.start}>ציון:</span><span className={Style.grade}>{obj.grade}</span></h2>
                <h2><span className={Style.start}>מורה:</span><span className={Style.end}>{obj.test.creator.name.first + " " + obj.test.creator.name.last}</span></h2>
                <h2><span className={Style.start}>תאריך הגשה:</span><span className={Style.end}>{new Date(obj.submissionDate).toLocaleDateString('he-IL', {timeZone:'Asia/Jerusalem'})}</span></h2>
            </header>
            <main className={Style.solvedTestContainer}>
                <h2 className={Style.headerTest}>פתרון המבחן</h2>
                <div className={Style.test}>
                    <div className={Style.title}>{obj.test.title}</div>
                    <div className={Style.description}>{obj.test.description}</div>
                    <div className={Style.side}>

                        <div className={Style.headling}>שאלות</div>
                        <div className={Style.questions}>
                            {
                                obj.questens.map((question, index) => {
                                    return <QuestionSolve key={question._id} responses={obj.responses} question={question} index={index}/>
                                })
                            }
                        </div>
                    </div>

                </div>

            </main>
            
        </div>
    )
}
