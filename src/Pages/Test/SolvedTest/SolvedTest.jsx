import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../../Components/DeleteButton/Button'
import FormTestSolve from '../FormTestSolve/FormTestSolve'
import { SolverTesContext } from '../Test'
import TestInfo from '../TestInfo/TestInfo'
import QuestionSolve from './QuestionSolve/QuestionSolve'
import Style from './SolvedTest.module.css'
import TestSolvedInfo from './TestSolvedInfo/TestSolvedInfo'

export default function SolvedTest() {
    const [obj, setObj] = useContext(SolverTesContext)
    const [toShow, setToShow] =useState(false)
    const info = useRef(null)
    

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll)
        return () => {
            window.removeEventListener("scroll", listenToScroll);
        }
    }, [])

    function listenToScroll() {
        const winScroll = document.body.scrollTop ||  document.documentElement.scrollTop;
            
        if (winScroll <= getOffset(info.current)) {
            setToShow(false)
        }  else {
            setToShow(true)
        } 
    }

    function getup() {
        // console.log(info.current);
        info.current.scrollIntoView()
    }

    const getOffset = (e) => {
        const rect = e?.getBoundingClientRect(),
          scrollTop = 
            window.pageYOffset ||  document.documentElement.scrollTop;
        return rect?.top + scrollTop;
      };

     

    return (
        <div className={Style.container}>
            <div className={Style.infoContainer}>
                <div className={Style.info} ref={info}>< TestSolvedInfo /></div>
            </div>

            <div className={Style.titleContainer}>
                <h2>{obj.test.title || obj.test.name || `המבחן של ${obj.test.creator.name.first} ${obj.test.creator.name.last}`}</h2>
                <h3>{obj.test.description || "פתרון המבחן"}</h3>
            </div>

            {
                obj.questens.map((question, index) => {
                    return <QuestionSolve responses={obj.responses} question={question} index={index} key={index} />
                })
            }

            {toShow && <div className={Style.toTop} onClick={getup}><Button circle={true}><i className="fas fa-arrow-up"></i></Button></div>}
        </div>
    )
}
