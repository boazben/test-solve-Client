import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { serverReq } from '../../../functions'
import { TestFormContext } from '../TestForm'
import Line from './Line/Line'
import ExamineeTable from './ExamineeTable/ExamineeTable'
import Style from './TestData.module.css'
import AnsTable from './AnsTable/AnsTable'

export const ExamineesContext = createContext()

export default function TestData({state}) {
    const [test, setTest] = useContext(TestFormContext)
    const [testData, setTestData] = state
    const [answered, setAnswered] = useState(false)
    const [received, setReceived] = useState(false)
    const [examinees, setExaminees] = useState([])
    const [statistics, setStatistics] = useState({})
    const [openExamTable, setOpenExamTable] = useState(false)
    const [openAnsTable, setOpenAnsTable] = useState(false)

    useEffect(() => {
        getExaminees()
        
    },[])

    useEffect(() => {
        calStatistics()
    },[examinees])

    async function getExaminees() {
        try {
            const examinees = await serverReq('post', '/get_testers', { "id": test._id })
            console.log(examinees);
            setExaminees(examinees)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    function calStatistics() {
        const total = examinees.length
        const didTest = examinees.filter(examinee => examinee.status.includes("Done"))
        const totalDidTest = didTest.length
        const averageGrade = (didTest.reduce((acc, curr) => acc + curr.grade, 0)) / totalDidTest
        const percentDid = (totalDidTest / total) * 100
        setStatistics({
                total: total,
                didTest: didTest,
                totalDidTest: totalDidTest,
                averageGrade: averageGrade,
                percentDid: percentDid
            })
    }





    function closed(e) {
        if (e.target === e.currentTarget) 
        setTestData(false)
    }

    function exit() {
        setTestData(false)
    }

    function formatTime(time) {
        let
          seconds = Math.floor((time / 1000) % 60),
          minutes = Math.floor((time / (1000 * 60)) % 60),
          hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      
        // hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        if (hours > 0) return `${hours}:${minutes}:${seconds} שעות`
        else return  `${minutes}:${seconds} דקות`
        
    }

    function formatDate(millisec) {
        const time = millisec - new Date().getTime()
        const days = time / (1000 * 60 * 60 * 24)
        if (days < 1 & days > 0) {
            const hours = days * 24
            return `נשארו ${hours.toFixed(0)} שעות להגשת המבחן `
        }
        else if (days <= 0) return "המבחן סגור. עבר הדד-ליין."
        else return `נשארו ${days.toFixed(0)} ימים להגשת המבחן`
    }


    return (
        <>
        {
            testData &&
            <div className={Style.background} onClick={(e) => closed(e)}>
                <div className={Style.container}>
                    <div className={Style.header}>
                        <div className={Style.exit} onClick={exit}><i className={"fas fa-times"}></i></div>                     
                        <h2 className={Style.title}>{`נתונים על ${test.name || `המבחן שיצרת`}`}</h2>
                    </div>
                    <div className={`${Style.main} ${Style.scroll}`}>
                            <Line icon="fas fa-file-alt">{`סטטוס מבחן: ${test.status_he}`}</Line>
                            <Line icon="fas fa-share-alt">{`סוג הפצה: ${test.toShared ? 'לכל מי שיש קישור' : 'למוזמנים בלבד'}`}</Line>
                            <Line icon="fas fa-hourglass-half">{`זמן לפתירת מבחן: ${formatTime(test.timeForTest)}`}</Line>
                            <Line icon="far fa-clock">{`דד-ליין: ${test.deadline ? `${new Date(test.deadline).toLocaleDateString("en-GB")}. ${formatDate(test.deadline)}` : 'לא הוגדר דד-ליין'}`}</Line>
                            <ExamineesContext.Provider value={[examinees, setExaminees]}>

                                <div className={Style.examineesContainer}>
                                    <div className={`${Style.examineesTitle} pointer`} onClick={() => setOpenExamTable(!openExamTable)}>
                                        <Line icon="fas fa-user-tag">{`זומנו להיבחן: ${statistics.total || '...'}`}</Line>
                                        <i className={`${Style.arrow} ${openExamTable ? `fas fa-sort-up` : "fas fa-sort-down"}`}></i>
                                    </div>
                                    <div className={`${Style.table} ${Style.scroll}`}>
                                        {openExamTable && <ExamineeTable />}
                                    </div>
                                </div>


                                <div className={Style.examineesContainer}>
                                    <div className={`${Style.examineesTitle} pointer`} onClick={() => setOpenAnsTable(!openAnsTable)}>
                                        <Line icon="fas fa-graduation-cap">{`מתוכם נבחנו: ${statistics.totalDidTest || '...'}`}</Line>
                                        <i className={`${Style.arrow} ${openAnsTable ? `fas fa-sort-up` : "fas fa-sort-down"}`}></i>
                                    </div>
                                    <div className={`${Style.table} ${Style.scroll}`}>
                                        {openAnsTable && <AnsTable users={statistics.didTest}/>}
                                    </div>
                                </div>
                                
                            </ExamineesContext.Provider>
                            <Line icon="fas fa-chart-line">{`ציון ממוצע: ${statistics.averageGrade || '...'}`}</Line>
                            <Line icon="fas fa-percent">{`אחוז משיבים: ${statistics.percentDid || '...'}%`}</Line>
                    </div>
                     
                </div>
            </div>
        }
        </>  
    )
}
