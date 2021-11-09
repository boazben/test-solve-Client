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
    const { testId } = useParams()
    const [obj, setObj] = useState()
    const [toShow, setToShow] =useState(false)
    const info = useRef(null)
    const creator = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll)
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
            const res = await serverReq('post', '/get_test', {id: testId});
            console.log(res);
            if (!res.test) creator.current = true
            setObj(res)
        } catch (error) {
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
            !obj ? <Loding text={"טוען מבחן..."}/> :
            obj?.status?.includes("Done") || obj?.status?.includes("Closed") ?
            <SolvedTest /> :
            <div className={Style.testInfoWram} >
                {
                    creator && 
                    <div className={Style.iconsGroupWarp}>
                        <ul className={`${Style.iconsGroup}`}>
                            <li className={Style.icon}><i className="fa fa-share-alt"></i></li>
                            <li className={Style.icon}><i className="fas fa-chart-pie"></i></li>
                            <li className={Style.icon}><Link to={`/test-form/${obj._id}`}><i className="fas fa-pencil-alt"></i></Link></li>
                            <li className={Style.icon}><i className="fas fa-cog"></i></li>
                        </ul>
                    </div>
                }
                    <div className={Style.info} ref={info}>< TestInfo /></div>
                    {
                        creator ?
                        <div className={Style.titleContainer}>
                            <h2>{obj.title || obj.name || `המבחן של ${obj.creator.name.first} ${obj.creator.name.last}`}</h2>
                            <h3>{obj.description || "בהצלחה במבחן"}</h3>
                        </div>
                        :
                        <div className={Style.titleContainer}>
                            <h2>{obj.test.title || obj.test.name || `המבחן של ${obj.test.creator.name.first} ${obj.test.creator.name.last}`}</h2>
                            <h3>{obj.test.description || "בהצלחה במבחן"}</h3>
                        </div>
                    }

                    <form className={Style.questionsContainer} onSubmit={e => submit(e)}>
                        <FormTestSolve />
                    </form>

                    {toShow && <div className={Style.toTop} onClick={getup}><Button circle={true}><i className="fas fa-arrow-up"></i></Button></div>}

            </div>
            
            
        }
        </SolverTesContext.Provider>
        
    )
}
