import React from 'react'
import Style from './QuestionSolve.module.css'

export default function QuestionSolve({responses, question, index}) {

   
    const counter = ["א", "ב", "ג", "ד", "ה","ו", "ז", "ח","ט", "י"]
    function score(question, responses) {
        let questionGrade = 0
        const ansAmount = question.answers.length
        const correctAnsAmount = question.answers.filter(answer => answer.correct).length
        if (correctAnsAmount == 0) return questionGrade = 0
        const score = question.score
        const scoreCorrectAns = score / correctAnsAmount
        const scoreWorngAns = score / ansAmount
        
        question.answers.forEach((answer) => {
            if (answer.correct) {
                if (responses[answer._id]) questionGrade += scoreCorrectAns;
            }
            else {
                if (responses[answer._id]) questionGrade -= scoreWorngAns;
            }
        })
        
        console.log(questionGrade);
        if (questionGrade < 0) questionGrade = 0
        if (questionGrade % 1 != 0) questionGrade = questionGrade.toFixed(1)
        return questionGrade
    }
    // console.log(question);
    return (
        <div className={Style.container}>
            <h3 className={Style.headline}><span>{index + 1}.</span>{question.title}</h3>
            <h5 className={Style.description}>{question.description}</h5>
            <div>ניקוד: <span>{score(question, responses)}/{question.score}</span></div>
            {
                question.answers.map(((answer, index) => {
                    // console.log('answer: ' + responses);
                    let style = 
                    answer.correct ? 'green' :
                    !responses[answer._id] ? 'null' : 'red';
                    return (
                        <div key={index} className={`${Style[style]} ${Style.answerContainer}`}>
                            <span className={Style.section}>{counter[index]}.</span>
                            {answer.text}
                            {
                                style.includes('green') ? 
                                <div className={`${Style.correct} ${Style.img}`}></div>
                                : style.includes('red') ?
                                <div className={`${Style.discorrect} ${Style.img}`}></div>
                                : null
                            }
                        </div>
                    )
                }))
            }
        </div>
    )
}
