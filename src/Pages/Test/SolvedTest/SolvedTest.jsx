import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../Components/DeleteButton/Button'
import { serverReq } from '../../../functions'
import FormTestSolve from '../FormTestSolve/FormTestSolve'
import { SolverTesContext } from '../Test'
import TestInfo from '../TestInfo/TestInfo'
import QuestionSolve from './QuestionSolve/QuestionSolve'
import Style from './SolvedTest.module.css'
import TestSolvedInfo from './TestSolvedInfo/TestSolvedInfo'

export default function SolvedTest({creator}) {
    const [obj, setObj] = useContext(SolverTesContext)
    const {userId} = useParams()
    const [toShow, setToShow] =useState(false)
    const info = useRef(null)
    

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll)
        if (creator) {
            getTestForCreator()
        }
        return () => {
            window.removeEventListener("scroll", listenToScroll);
        }
    }, [])

    async function getTestForCreator() {
        try {
            // console.log(`The id Test: ${testId}`);
            console.log(userId);
            const res = await serverReq('post', '/get_test', {"idTest": obj._id, "idUser": userId});
            console.log('noe:');
            console.log(res);
            setObj(res)
        } catch (error) {
            console.log(error.response?.data?.error || error.message || error);
        }
    }

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
                <h2>{obj?.test?.title || obj?.test?.name || `?????????? ???? ${obj?.test?.creator?.name?.first} ${obj?.test?.creator?.name?.last}`}</h2>
                <h3>{obj?.test?.description || "?????????? ??????????"}</h3>
            </div>

            {
                obj?.questens.map((question, index) => {
                    return <QuestionSolve responses={obj.responses} question={question} index={index} key={index} />
                })
            }

            {toShow && <div className={Style.toTop} onClick={getup}><Button circle={true}><i className="fas fa-arrow-up"></i></Button></div>}
        </div>
    )
}
