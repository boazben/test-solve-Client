import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverReq } from '../../functions'
import Style from './MyTestsStyle.module.css'
import TestLinkShow from './TestLinkShow/TestLinkShow'
import TestToSolve from './TestToSolve/TestToSolve'

export default function MyTests() {
    const [solved, setSolved] = useState(false)
    const [solvedTests, setSolvedTests] = useState([])
    const tests = useRef([])
    const [testsToSolve, setTestsToSolve] = useState([])

  useEffect(() => {
    getTests()
  }, [])
  
  async function getTests() {
    try {
      tests.current = await serverReq('post', '/my_tests')
      console.log(tests.current);

    setSolvedTests(tests.current.filter(test => test.status.includes("Done") || test.status.includes("Closed")).sort((test1, test2) => test2.endDate - test1.endDate))
    setTestsToSolve(tests.current.filter(test => test.status.includes('Not Open') || test.status.includes('In Doing')).sort((test1, test2) => {
      if (test1.status.includes('In Doing')) return 1
      if (test2.status.includes('In Doing')) return 1
      test1.test.deadline = test1.test.deadline ?  test1.test.deadline : 0;
      test2.test.deadline = test2.test.deadline ?  test2.test.deadline : 0;
      return  test2.test.deadline -  test1.test.deadline

    }))
    } catch (error) {
      throw error
      console.log(error.response?.data?.error || error.message || error);
    }
  }
    return (
        <>
        <h1 className={Style.h1}>המבחנים שלי</h1>
          <div className={Style.showState} onClick={() => setSolved(!solved)}>
            <div className={!solved ? `${Style.block} ${Style.left}` : `${Style.block} ${Style.right}`}></div>
            <span className={!solved ? `${Style.show} ${Style.rightText}` : `${Style.show} ${Style.leftText}`}>{!solved? 'מבחנים להגשה': 'מבחנים שהוגשו'}</span>
          </div>

          {!solved ? 
            testsToSolve.length == 0 ? <div className={Style.message}><i className={`fas fa-check-circle ${Style.messageIcon}`}></i> <h3>אין אף מבחן להגשה!</h3></div> :
            <div className={Style.testsContainer}>
              {
                testsToSolve.map(test => {
                  return <Link className={Style.Link} to={`/test/${test.test._id}`} key={test._id}><TestToSolve test={test} key={test._id}/></Link>
                })
              }
            </div> 
            :
            solvedTests.length == 0 ? <div className={Style.message}><i className={`fas fa-sad-tear ${Style.messageIcon}`}></i> <h3>עוד לא הגשת אף מבחן...</h3></div>:
            <div className={Style.testsContainer}>
              {
                solvedTests.map(test => {
                  return <Link className={Style.Link} to={`/test/${test.test._id}`} key={test._id}><TestToSolve test={test} key={test._id}/></Link>
                })
              }
            </div>
            
          }
            { /* {
              testsState.length == 0 ?<div> <h1>איזה יופי! אין מבחנים כרגע... </h1> <h2>או שהחיבור לאינטרנט שלך נמצא בקשים...</h2> </div> :
                testsState.map(test => {
                    return <Link className={Style.Link} to={`/test/${test.test._id}`} key={test._id}><TestLinkShow test={test} key={test._id}/></Link> 
                })
            } */ }
        </>

    )
}
