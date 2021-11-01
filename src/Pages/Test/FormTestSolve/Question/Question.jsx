import React from 'react'
import Answer from './Answer/Answer'
import Style from './Question.module.css'

export default function Question({question, index}) {
    return (
        <div className={Style.questionsContainer}>
            <div className={Style.title}>
                <span>{index + 1}</span>. {question.title || `שאלה מספר ${index + 1}`}  
            </div>

            <div className={Style.description}>
                <span>
                {`${question.score} נק'`}
                </span>
                {question.description}  
            </div>

            <div className={Style.answersContainer}>
            {
                question.answers.map(function(answer, index) {
                    return <Answer answer={answer} index={index} key={index} />
                } )
            }
            </div>
            
                
        
        </div>
    )
}
