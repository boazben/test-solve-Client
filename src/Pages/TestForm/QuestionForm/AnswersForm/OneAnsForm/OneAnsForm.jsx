import React, { useContext, useState } from 'react'
import { serverReq } from '../../../../../functions'
import { QuestionContext } from '../../QuestionForm'
import './OneAnsForm.css'

export default function OneAnsForm({answer, index}) {
    const [question, setQuestion] = useContext(QuestionContext)
    const [textState, setTextState] = useState('text')
    const counter = ["א", "ב", "ג", "ד", "ה","ו", "ז", "ח","ט", "י"]

    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }

    async function saveInput(e) {
        try {
            const text = e.target.value
            const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"answer": {"_id": question.answers[index]._id, "text": text }}})
            setQuestion(updateQuestion)
            change()
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    
    async function saveChackbox(e) {
        try {
            const check = e.target.checked
            const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"answer": {"_id": question.answers[index]._id, "correct": check}}})
            setQuestion(updateQuestion)
            change()
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    async function deleteAnswer() {
        try {
            const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"answer": {"_id": question.answers[index]._id, "active": "false"}}})
            setQuestion(updateQuestion)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    // console.log(answer);
    return (
        <div className="AnsContainer">
            <div className="DeldeteOneAnsForm" onClick={deleteAnswer}>
                <i className="fas fa-minus"></i>
            </div>

            <input className='checkboxAns' type="checkbox" name="ifTrue" defaultChecked={answer?.correct} onChange={saveChackbox}/>
            <div className="AlphCounter">{counter[index]}.</div>
            {
                textState === 'text' ? <span className="onwAnswerForm" onClick={change}>{question.answers[index].text || <span className="onwAnswerForm empty"> סמן את הריבוע אם התשובה הזאת נכונה </span>}</span> : 
                <>
                <input
                    className="onwAnswerInput"
                    type="text"
                    autoComplete="false"
                    maxLength="80"
                    autoFocus 
                    onFocus={e => e.target.select()}
                    defaultValue={question.answers[index].text ||  'סמן את הריבוע אם התשובה הזאת נכונה'}
                    name="text"
                    onBlur={saveInput}
                    onKeyDown={(e) => e.key === 'Enter' && saveInput(e)}
                    />
                </>
            }
            
            </div>
    )
}

