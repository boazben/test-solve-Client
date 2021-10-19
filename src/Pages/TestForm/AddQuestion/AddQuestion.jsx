import React, { useContext, useState } from 'react'
import AddBut from '../../../Components/AddBut/AddBut'
import Popup from '../../../Components/Popup/Popup'
import { serverReq } from '../../../functions'
import { TestFormContext } from '../TestForm'
import Style from './AddQuestion.module.css'

export default function AddQuestion() {
    const [test, setTest] = useContext(TestFormContext)
    const [popup, setPopup] =useState(false)

    async function addQuestion() {
        if (test.status.includes('Started') || test.status.includes('Closed')) {
            setPopup(true)
        }
        else {
            try {
                // console.log('נוספה שאלה');
                const updateTest = await serverReq('put', '/create_question', {"idTest": test._id})
                const res = await serverReq('post', '/test-form', { "idTest": test._id })
                Promise.all([updateTest, res]).then((responses) => {
                    // console.log('in promise:', responses);
                    setTest(responses[1])
                })
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }
        }
    }
    
    return (
        <div className={Style.QuestionContainerForm}>
           <button onClick={addQuestion} className="btn" > הוספת שאלה </button>
           {popup ? < Popup state={[popup, setPopup]} title={"שגיאה"} message={"לא ניתן להוסיף שאלות כאשר המבחן סגור או כאשר התחילו להשיב עליו"} btnText={"אוקיי, הבנתי"} /> : null}
        </div>
    )
}