import React, { useContext, useRef, useState } from 'react'
import { serverReq } from '../../../functions'
import { TestFormContext } from '../TestForm'
import './TitelForm.css'

export default function TitelForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [textState, setTextState] = useState('text')

    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }


    async function save(e) {
        try {
            const text = e.target.value
            const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"title": text}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
            change() 
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    
    
    return (
        <div className="titleContainer">
            {
              textState === 'text' ? <h2 className="titleForm" onClick={change}>{test.title || 'ללא כותרת'}</h2> : 
              <input
                className="titelInput"
                type="text" 
                autoFocus
                onFocus={e => e.target.select()} 
                defaultValue={test.title || 'ללא כותרת'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                />
            }
            
        </div>
    )
}
