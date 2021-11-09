import React, { createContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import Loding from '../../../Components/Loding/Loding'
import { serverReq } from '../../../functions'
import TestInfo from '../TestInfo/TestInfo'
import Style from './TestPreview.module.css'

export const TestPrivewContext = createContext()

export default function TestPreview() {
    const [test, setTest] = useState()
    const { testId } = useParams()
    const [toShow, setToShow] =useState(false)
    const info = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll)
        getTest()
        return () => {
            window.removeEventListener("scroll", listenToScroll);
        }
    }, [])

    async function getTest() {
        try {
            const res = await serverReq('post', '/get_test_preview', {id: testId});
            console.log(res);
            setTest(res)
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
        <TestPrivewContext.Provider value={[test, setTest]} >
        {
            !test ? <Loding text={"טוען מבחן..."}/> :
            <div className={Style.testInfoWram} >
                    <div className={Style.info} ref={info}>< TestInfo test={test} /></div>

                    <div className={Style.titleContainer}>
                        <h2>{test.title || test.name || `המבחן של ${test.creator.name.first} ${test.creator.name.last}`}</h2>
                        <h3>{test.description || "בהצלחה במבחן"}</h3>
                    </div>

                    {/* <form className={Style.questionsContainer} onSubmit={e => submit(e)}>
                        <FormTestSolve />
                    </form> */}

                    {toShow && <div className={Style.toTop} onClick={getup}><Button circle={true}><i className="fas fa-arrow-up"></i></Button></div>}

            </div>
            
            
        }
        </TestPrivewContext.Provider>
    )
}
