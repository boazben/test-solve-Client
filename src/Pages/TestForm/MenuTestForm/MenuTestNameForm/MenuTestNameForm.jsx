import React, { useContext, useState } from 'react'
import Popup from '../../../../Components/Popup/Popup'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import './MenuTestNameForm.css'

export default function MenuTestNameForm() {
    const [test, setTest] = useContext(TestFormContext)
    const [textState, setTextState] = useState('text')
    const [popup, setPopup] = useState(false)

    function change() {
        if (test.status.includes('Started') || test.status.includes('Closed')) {
            setPopup(true)
        } else {
            const newState =  textState === 'text' ? 'input' : 'text'
            setTextState(newState)
        }
    }
    async function save(e) {
        
                  try {
                const text = e.target.value
                const updateTest = await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {"name": text}})
                const res = await serverReq('post', '/test-form', { "idTest": test._id })
                setTest(res)
                change() 
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }
    }
    // console.log(test);
    
    return (
        <div className="menuTestNameContainer">
            שם מבחן:
            {
                textState === 'text' ? <span className="nameForm" onClick={change}>{test.name || 'ללא שם'}</span> : 
                <input
                className="nameInput"
                type="text" 
                autoFocus 
                onFocus={e => e.target.select()}
                defaultValue={test.name || 'ללא שם'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                /> 
                || "ללא שם"
            }
            {popup ? < Popup state={[popup, setPopup]} title={"שגיאה"} message={"לא ניתן לשנות שם מבחן כאשר המבחן סגור או כאשר התחילו להשיב עליו"} btnText={"אוקיי, הבנתי"} /> : null}

    </div>

    )
}

