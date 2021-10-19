import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverReq } from '../../functions'
import Style from './MyTestsStyle.module.css'
import TestLinkShow from './TestLinkShow/TestLinkShow'

export default function MyTests() {
    const [testsState, setTestesState] = useState([])

  useEffect(() => {
    getTests()
  }, [])
  
  async function getTests() {
    try {
      const res = await serverReq('post', '/my_tests')
      setTestesState(res)
    } catch (error) {
      throw error
      // console.log(error.response?.data?.error || error.message || error);
    }
  }
    return (
        <div className={Style.TestsContainer}>
            {
              testsState.length == 0 ?<div> <h1>איזה יופי! אין מבחנים כרגע... </h1> <h2>או שהחיבור לאינטרנט שלך נמצא בקשים...</h2> </div> :
                testsState.map(test => {
                    return <Link className={Style.Link} to={`/test/${test.test._id}`} key={test._id}><TestLinkShow test={test} key={test._id}/></Link> 
                })
            }
        </div>

    )
}
