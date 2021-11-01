import React, { createContext, useContext, useEffect, useState } from 'react'
import { serverReq } from '../../../functions'
import Style from'./QuestionForm.module.css'
import TitelQuestionForm from './TitelQuestionForm/TitelQuestionForm'
import Loding from '../../../Components/Loding/Loding'
import DescriptionQuestionForm from './DescriptionQuestionForm/DescriptionQuestionForm'
import { TestFormContext } from '../TestForm'
import AnswersForm from './AnswersForm/AnswersForm'
import AddBut from '../../../Components/AddBut/AddBut'
import DeleteButton from '../../../Components/DeleteButton/Button'
import ScoreForm from './ScoreForm/ScoreForm'
import Popup from '../../../Components/Popup/Popup'

export const QuestionContext = createContext()

export default function QuestionForm({idQuestion, index}) {
    const [question, setQuestion] = useState()
    const [test, setTest] = useContext(TestFormContext)
    const [popup, setPopup] = useState(false)

    useEffect(()=> {
        getQuestion()
    }, [])

    async function getQuestion() {
        try {
           
            const res = await serverReq('post', '/get_questin', { "idQuestion": idQuestion})
            setQuestion(res)
        } catch (error) {
           
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    async function addAnswer() {
        if (test.status.includes('Started') || test.status.includes('Closed')) {
            setPopup(true)
        } else {
            try {
                const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": idQuestion, "newData": {"answer": {"text": "", "correct": false}}})
                setQuestion(updateQuestion)
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)

            }
        }
    }

    async function deleteQuestion() {
        if (test.status.includes('Started') || test.status.includes('Closed')) {
            setPopup(true)
        } else {
            try {
                const updateQuestion = await serverReq('put', '/edit_question', {"idQuestion": idQuestion, "newData": {"active": false}})
                const thisTest = await serverReq('post', '/test-form', {"idTest": test._id})
                setTest(thisTest)
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }

        }
        
        
    }


    // console.log(question);
    return (
        <div className={Style.QuestionFormContainer}>
            {
            !question ?  <Loding text="טוען שאלות..." /> :
            <QuestionContext.Provider value={[question, setQuestion]}>
                <button className={Style.btn} onClick={deleteQuestion}><i className="fas fa-trash"></i></button>
                {popup ? < Popup state={[popup, setPopup]} title={"שגיאה"} message={"לא ניתן לשנות או למחוק שאלה כאשר המבחן סגור או כאשר התחילו להשיב עליו"} btnText={"אוקיי, הבנתי"} /> : null}
                <div className={Style.titelOfQuestonCon}>
                    <span className={Style.numOfQuestion}>{index + 1}.</span>
                    <TitelQuestionForm />
                </div>
                <DescriptionQuestionForm />
                <div className={Style.questionOptionsContainer}>
                    <button className={Style.AddAnswer} onClick={addAnswer}>
                        <i className="fas fa-plus"></i>
                    </button>
                    <ScoreForm />
                </div>
                <AnswersForm />
            </QuestionContext.Provider>
            }
        </div>
    )
}
