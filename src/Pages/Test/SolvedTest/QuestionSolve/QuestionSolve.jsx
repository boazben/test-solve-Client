import React, { useEffect, useRef } from 'react'
import Style from './QuestionSolve.module.css'

export default function QuestionSolve({responses, question, index}) {

    const answerStyle = useRef({
        'true': Style.correct,
        'false': Style.wrong,
        'null': Style.regoler
    })

    

   
    const counter = ["א", "ב", "ג", "ד", "ה","ו", "ז", "ח","ט", "י"]

    function score(question, responses) {
        if (!responses) return 0
        let questionGrade = 0
        const ansAmount = question.answers.length
        const correctAnsAmount = question.answers.filter(answer => answer.correct).length
        if (correctAnsAmount == 0) return questionGrade = 0
        const score = question.score
        const scoreCorrectAns = score / correctAnsAmount
        const scoreWorngAns = score / ansAmount
        
        question.answers.forEach((answer) => {
            if (answer.correct) {
                if (responses["inp" + answer._id]) questionGrade += scoreCorrectAns;
            }
            else {
                if (responses["inp" + answer._id]) questionGrade -= scoreWorngAns;
            }
        })
        
        console.log(questionGrade);
        if (questionGrade < 0) questionGrade = 0
        if (questionGrade % 1 != 0) questionGrade = questionGrade.toFixed(1)
        return questionGrade
    }
    
    function ifCorrect(answer, responses) {
        if (!responses) {
            return answer.correct ? false : null
        } else { // Heve responses:
            if (answer.correct) {
                return responses["inp" + answer._id]
            } else { // If !answer.correct : 
                return responses["inp" + answer._id] ? false : null
            }
        }
    }


    return (
        <div className={Style.container}>
            <h3 className={Style.headline}>{`${index + 1}. ${question.title || `שאלה מספר ${index + 1}`}`}</h3>
            <div >ניקוד: <span className={question.score == score(question, responses) ? Style.correct : Style.wrong}>{score(question, responses)}/{question.score}</span></div>
            <h5 className={Style.description}>{question.description}</h5>
            {
                
                question.answers.map(((answer, index) => {
                    console.log(!responses ? null : responses["inp" + answer._id] ? `Style.after` : null);
                    return (
                        <div className={Style.answerContainer} key={index}>
                            <div className={`${Style.indication} ${answer.correct ? Style.correctInd :  responses ?  responses["inp" + answer._id] ? Style.wrongInd : null : null }`}>{answer.correct ? <i className="fas fa-check"></i> : responses ?  responses["inp" + answer._id] ? <i className="fas fa-times"></i> : null : null}</div>
                            <div className={`${Style.answerSquare} ${!responses ? null : responses["inp" + answer._id] ? Style.after : null}`}></div>
                            <div key={index} className={`${Style.textAnswerContainer} ${answerStyle.current[`${ifCorrect(answer, responses)}`]}`}>
                                {`${counter[index]}. ${answer.text} `}
                            </div>
                        </div>
                    )
                }))
            }
        </div>
    )
}
