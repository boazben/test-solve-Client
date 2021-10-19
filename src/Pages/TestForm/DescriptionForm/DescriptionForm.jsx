import React, { useContext, useState } from 'react'
import { serverReq } from '../../../functions'
import { TestFormContext } from '../TestForm'
import './DescriptionForm.css'

export default function DescriptionForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [textState, setTextState] = useState('text')
    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }
    async function save(e) {
        try {
            const text = e.target.value
            const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"description": text}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
            change()
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    
    return (
        <div className="descriptionContainer">
            {
              textState === 'text' ? <span className="descriptionForm" onClick={change}>{test.description || 'אני התיאור של המבחן- לחצו עלי כדי לשנות אותי :)'}</span> : 
              <input
                className="descriptionInput"
                type="text" 
                autoFocus 
                onFocus={e => e.target.select()}
                defaultValue={test.description || 'אני התיאור של המבחן- לחצו עלי כדי לשנות אותי :)'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                />
            }
            
        </div>
    )
}
