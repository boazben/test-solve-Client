import React, { createContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { serverReq } from '../../functions';
import Loding from '../../Components/Loding/Loding'
import Style from './TestStyle.module.css'
import TestInfo from './TestInfo/TestInfo';
import FormTestSolve from './FormTestSolve/FormTestSolve';
import SolvedTest from './SolvedTest/SolvedTest';
import TestToSolve from '../MyTests/TestToSolve/TestToSolve'
import Button from '../../Components/DeleteButton/Button';

export const SolverTesContext = createContext()
export const SubmitContext = createContext()

export default function Test() {
    const { testId, userId } = useParams()
    const [obj, setObj] = useState()
    const [toShow, setToShow] =useState(false)
    const [toShere, setToShere] = useState(false)
    const info = useRef(null)
    const creator = useRef(null)
    const toConnect = useRef({
        email: null,
        name: null
    })

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll)
        console.log(userId);
        getTest()
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

    async function getTest() {
        try {
            // console.log(`The id Test: ${testId}`);
            const res = await serverReq('post', '/get_test', {idTest: testId});
            if (!res.test) creator.current = true
            setObj(res)
        } catch (error) {
            console.log(error.response.data);
            if (error.response?.data?.error.includes("The test accessible to order holders only")) {
                const connsectDetails = error.response.data.error.split("\n")
                toConnect.current.email = connsectDetails[1]
                toConnect.current.name = connsectDetails[2]
                setToShere(true)
            }
            console.log(error.response?.data?.error || error.message || error);
        }
    }

    async function submit(e) {
        e.preventDefault()
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {})
        // console.log(values);
        try {
            const res = await serverReq('put', '/Submit_Test', {"idTestPlacement": obj._id, "answersObj": values})
            // console.log(res);
            setObj(res)
        } catch (error) {
            
            console.log(error.response?.data?.error || error.message || error);
        }

    }

    return (
        <SolverTesContext.Provider value={[obj, setObj]} >
        {
            !obj ? toShere ?  
            <div className={Style.lockContainer}>
                <i className={`fas fa-user-lock ${Style.lockIcon}`}></i>
                <h1>?????????? ???????? ???????????????? ???? ??????????????</h1>
                <h2>{`???????????? ?????? ?????? ???????? ?????????? ??${toConnect.current.name}:`} <a href={`mailto:${toConnect.current.email}`}>{toConnect.current.email}</a></h2>
               
            </div>
            :
            <Loding text={"???????? ????????..."}/> :
            // creator.current && userId ?
            // <SolvedTest creator={true}/>
            // :
            <>
            {
                creator.current && 
                <div className={Style.iconsGroupWarp}>
                    <Link className={Style.link} to={`/test-form/${testId}`} >
                    <ul className={`${Style.iconsGroup}`}>
                        <li className={Style.icon}><i className="fa fa-share-alt"></i></li>
                        <li className={Style.icon}><i className="fas fa-chart-pie"></i></li>
                        <li ><i className="fas fa-pencil-alt"></i></li>
                        <li className={Style.icon}><i className="fas fa-cog"></i></li>
                    </ul>
                    </Link>
                </div>
            }
            {
            (creator.current && userId) || obj?.status?.includes("Done") || obj?.status?.includes("Closed") ?
            <SolvedTest creator={creator.current && userId}/> :
            <div className={Style.testInfoWram} >
                    <div className={Style.info} ref={info}>< TestInfo /></div>
                    {
                        creator.current ?
                        <div className={Style.titleContainer}>
                            <h2>{obj?.title || obj?.name || `?????????? ???? ${obj?.creator?.name?.first} ${obj?.creator?.name?.last}`}</h2>
                            <h3>{obj?.description || "???????????? ??????????"}</h3>
                        </div>
                        :
                        <div className={Style.titleContainer}>
                            <h2>{obj.test.title || obj.test.name || `?????????? ???? ${obj.test.creator.name.first} ${obj.test.creator.name.last}`}</h2>
                            <h3>{obj.test.description || "???????????? ??????????"}</h3>
                        </div>
                    }

                    <form className={Style.questionsContainer} onSubmit={e => submit(e)}>
                        <FormTestSolve />
                    </form>

                    {toShow && <div className={Style.toTop} onClick={getup}><Button circle={true}><i className="fas fa-arrow-up"></i></Button></div>}

            </div>
            
                }   
        </>
        }
        </SolverTesContext.Provider>
    )
}
