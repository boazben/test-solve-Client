import React, { useContext } from 'react'
import { QuestionContext } from '../QuestionForm'
import './AnswersForm.css'
import OneAnsForm from './OneAnsForm/OneAnsForm'

export default function AnswersForm() {
    const [question, setQuestion] = useContext(QuestionContext)
    // console.log("Answers:", question.answers);
    
    return (
        <div className="AnswersFormContainer">
            {
                question?.answers?.map((answer, index) => {
                    return (
                    <div className="OneAnsCont" key={"con" + index}>
                        <OneAnsForm key={index} index={index} answer={answer}/>
                    </div>
                    )
                })
            }
            
        </div>
    )
}
