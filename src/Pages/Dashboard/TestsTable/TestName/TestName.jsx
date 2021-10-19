import React, { useEffect, useState } from 'react'
import { serverReq } from '../../../../functions'
import Style from './TestName.module.css'

export default function TestName({testId}) {
    const [textState, setTextState] = useState('text')
    const [test, setTest] = useState()

    useEffect(() => {
        async function getTest() {
            try {
                const res = await serverReq('post', '/test-form', {"idTest": testId})
                // console.log('A secend before we get the test:', res) ;
                setTest(res)
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }
        }
        getTest()
    }, [])
    
    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }
    async function save(e) {
        try {
            const text = e.target.value
            const updateTest = await serverReq('put', '/edit_test', {"idTest": testId, "newData": {"name": text}})
            setTest(updateTest);
            change()
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    
    return (
        <div className={Style.nameContainer}>
            {
              textState === 'text' ? <span className={Style.nameForm} onClick={change}>{test?.name || 'ללא שם'}</span > : 
              <input
                className={Style.nameInput}
                type="text" 
                autoFocus 
                defaultValue={test?.name || 'ללא שם'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                />
            }
            
        </div>
    )
}
