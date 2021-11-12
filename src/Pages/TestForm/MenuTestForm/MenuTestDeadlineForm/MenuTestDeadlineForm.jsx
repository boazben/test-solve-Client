import React, { useContext, useRef, useState } from 'react'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import Style from './MenuTestDeadlineForm.module.css'

export default function MenuTestDeadlineForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [textState, setTextState] = useState('text')
    const form = useRef(null)

    async function submit(e) {
        e.preventDefault();
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
        console.log(e.target.input.value);
        try {
            await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"deadline": values.input}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
        } catch (error) {
            throw error
            // console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }
    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }
    
    async function saveDeadline(e) {
        try {
            const text = e.target.value
            const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"deadline": text}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
            change() 
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

 
    return (
        <form ref={form} className={Style.form} onSubmit={e  => submit(e)}>
            <input className={`${Style.input} ${test.deadline ? Style.filled : null}`}
            type="date"
            name="input" 
            data-date-format="DD MMMM YYYY"
            defaultValue={test.deadline ? new Date(test.deadline).toISOString().split('T')[0] : "dd/mm/yyyy"}
            onFocus={e => e.target.select()} 
            onBlur={() => form.current.requestSubmit()}
            // onClick={(e) }
             />
        </form>
    //     <div>דד-ליין: 
    //     {
    //     textState === 'text' ? <span className="nameForm" onClick={change}>{toPreviwDate(test.deadline) || 'ללא דד-ליין'}</span> : 
    //     <input
    //     className="deadlineInput"
    //     type="date" 
    //     autoFocus 
    //     // defaultValue={new Date().toUTCString()}
    //     onBlur={saveDeadline}
    //     onKeyDown={(e) => e.key === 'Enter' && saveDeadline(e)}
    //     /> 
    //     || "ללא דד-ליין"
    //     }    
    // </div>
    


    )
}

