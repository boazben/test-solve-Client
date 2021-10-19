import React, { useContext, useState } from 'react'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import './MenuTestDeadlineForm.css'

export default function MenuTestDeadlineForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [textState, setTextState] = useState('text')
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

    function toPreviwDate(date) {
        const deadline = new Date(date)
        // console.log(deadline);
        return deadline.toLocaleDateString('he-IL', {timeZone:'Asia/Jerusalem'})//.replace(/\D/g,'/')
    }
 
    return (
        <div>דד-ליין: 
        {
        textState === 'text' ? <span className="nameForm" onClick={change}>{toPreviwDate(test.deadline) || 'ללא דד-ליין'}</span> : 
        <input
        className="deadlineInput"
        type="date" 
        autoFocus 
        // defaultValue={new Date().toUTCString()}
        onBlur={saveDeadline}
        onKeyDown={(e) => e.key === 'Enter' && saveDeadline(e)}
        /> 
        || "ללא דד-ליין"
        }    
    </div>
    


    )
}

