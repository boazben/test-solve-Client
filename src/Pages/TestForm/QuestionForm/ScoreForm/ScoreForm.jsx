import React, { useContext, useState } from 'react'
import { serverReq } from '../../../../functions'
import { QuestionContext } from '../QuestionForm'
import './ScoreForm.css'

export default function ScoreForm() {
    const [question, setQuestion] = useContext(QuestionContext)
    const [textState, setTextState] = useState('text')

    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }

    async function save(e) {
        try {
            let num = e.target.value
            if (num > 100) num = 100
            if (num < 0) num = 0 
            const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"score": num}})
            setQuestion(updateQuestion)
            change()
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    
    return (
        <div className="scoreQuestionContainer">
            ניקוד: 
            {
              textState === 'text' ? <span className="scoreQuestionForm" onClick={change}>{question.score || "ללא ניקוד "}</span> : 
              <input
                className="scoreQuestionInput"
                type="number"
                min="0"
                max="100"
                autoFocus 
                onFocus={e => e.target.select()}
                defaultValue={question.score ||  'ללא ניקוד'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                />
            }
            
        </div>
    )
}