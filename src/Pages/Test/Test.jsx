import React, { createContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { serverReq } from '../../functions';
import Loding from '../../Components/Loding/Loding'
import Style from './TestStyle.module.css'
import TestInfo from './TestInfo/TestInfo';
import FormTestSolve from './FormTestSolve/FormTestSolve';
import SolvedTest from './SolvedTest/SolvedTest';

export const SolverTesContext = createContext()
export const SubmitContext = createContext()

export default function Test() {
    const { testId } = useParams()
    const [obj, setObj] = useState()
    const submitInput = useRef(null)

    useEffect(() => {
        getTest()
    }, [])

    async function getTest() {
        try {
            // console.log(`The id Test: ${testId}`);
            const res = await serverReq('post', '/get_test', {id: testId});
            // console.log(res);
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
        <div>
            {!obj ? <Loding text={"טוען מבחן..."}/> :
            obj?.status?.includes("Done") || obj?.status?.includes("Closed") ?
            <SolvedTest obj={obj} /> :
            <SolverTesContext.Provider value={[obj, setObj]} >
                <main className={Style.testContainer}>
                    <div className={Style.headerContainer}>
                        <div className={Style.TitleContainer}>
                            <h1 className={Style.title}>{obj.test.title || obj.test.name || "בהצלחה במבחן!"}</h1>
                            <h2 className={Style.description}>{obj.test.description}</h2>
                        </div>
                        <SubmitContext.Provider value={submitInput} >
                            <form ref={submitInput} className={Style.form}  onSubmit={e => submit(e)} > 
                                <div className={Style.infoContainer}>
                                    <TestInfo/>
                                </div>
                                <FormTestSolve />
                            </form>
                        </ SubmitContext.Provider>
                    </div>
                </main>
            </SolverTesContext.Provider>
            }
        </div>
    )
}
