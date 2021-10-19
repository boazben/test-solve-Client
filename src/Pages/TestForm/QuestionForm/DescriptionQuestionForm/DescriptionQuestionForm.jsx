import { useContext, useState } from 'react'
import { serverReq } from '../../../../functions'
import {QuestionContext} from '../QuestionForm'
import './DescriptionQuestionForm.css'

export default function DescriptionQuestionForm() {
    const [question, setQuestion] = useContext(QuestionContext)
    const [textState, setTextState] = useState('text')

    function change() {
        const newState =  textState === 'text' ? 'input' : 'text'
        setTextState(newState)
    }

    async function save(e) {
        try {
            const text = e.target.value
            const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"description": text}})
            setQuestion(updateQuestion)
            change()
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }
    
    return (
        <div className="descriptionQuestionContainer">
            {
              textState === 'text' ? <span className="descriptionQuestionForm" onClick={change}>{question.description ||<span className="descriptionQuestionForm empty"> פה נכנס התיאור </span>}</span> : 
              <input
                className="descriptionQuestionInput"
                type="text" 
                autoFocus 
                onFocus={e => e.target.select()}
                defaultValue={question.description ||  'פה נכנס התיאור'}
                onBlur={save}
                onKeyDown={(e) => e.key === 'Enter' && save(e)}
                />
            }
            
        </div>
    )
}
