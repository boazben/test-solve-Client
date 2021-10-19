
import { useContext, useState } from 'react'
import { serverReq } from '../../../../functions'
import {QuestionContext} from '../QuestionForm'
import './TitelQuestionForm.css'

export default function TitelQuestionForm() {
    const [question, setQuestion] = useContext(QuestionContext)
    const [textState, setTextState] = useState('text')

    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }

    async function save(e) {
        try {
            const text = e.target.value
            const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"title": text}})
            setQuestion(updateQuestion)
            change()
        } catch (error) {
            throw error
            // console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    
    return (
        <div className="titleQuestionContainer">
            {
              textState === 'text' ? <span className="titleQuestionForm" onClick={change}>{question.title ||<span className="titleQuestionFrom empty"> אני הכותרת של השאלה, שנה אותי! </span>}</span> : 
              <input
                className="titelQuestionInput"
                type="text"
                autoComplete="false"
                maxLength="80"
                autoFocus 
                onFocus={e => e.target.select()}
                defaultValue={question.title ||  'אני הכותרת של השאלה, שנה אותי!'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                />
            }
            
        </div>
    )
}