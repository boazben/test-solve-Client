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
import Icon from '../../../Components/Icon/Icon'
import InputForm from '../InputForm/InputForm'
import InputQuesForm from './InputQuesForm/InputQuesForm'

export const QuestionContext = createContext()

export default function QuestionForm({question, index}) {
    
    const [test, setTest] = useContext(TestFormContext)
    const [popup, setPopup] = useState(false)
    const [lodingAns, setLodingAns] = useState(false)
    const [lodingQues, setLodingQues] = useState(false)

    // useEffect(()=> {
    //     getQuestion()
    // }, [])

    // async function getQuestion() {
    //     try {
           
    //         const res = await serverReq('post', '/get_questin', { "idQuestion": idQuestion})
    //         setQuestion(res)
    //     } catch (error) {
           
    //         console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
    //     }
    // }

    async function addAnswer() {
                setLodingAns(true)
            try {
                await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"answer": {"text": "", "correct": false}}})
                const res = await serverReq('post', '/test-form', { "idTest": test._id })
                setTest(res)
                setLodingAns(false)
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }
    }

    async function deleteQuestion() {
        setLodingQues(true)
        try {
            await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {"active": false}})
            const thisTest = await serverReq('post', '/test-form', {"idTest": test._id})
            setTest(thisTest)
            setLodingQues(false)
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }

        }
        
        
    


    // console.log(question);
    return (
        <div className={Style.QuestionFormContainer}>
            {
            !question ?  <Loding text="טוען שאלות..." /> :
            
            <QuestionContext.Provider value={question}>

                <div className={Style.deleteQuestion}>
                    <Icon 
                            icon="fas fa-trash"
                            backgroundColor="#E57462"
                            color="#F3F2DC" 
                            size="30px" 
                            fontSize="15px" 
                            
                            onClick={deleteQuestion}
                             
                            
                    />
                </div>


                {
                    lodingQues && 
                    <div className={Style.ldsRing}><div></div><div></div><div></div><div></div></div> 
                }

                <h2 className={Style.title}>שאלה מספר {index + 1}</h2>

                <InputQuesForm
                        type="text"
                        propartype="title"
                        text="כותרת השאלה"
                        
                 />

                <InputQuesForm
                        type="text"
                        propartype="description"
                        text="תיאור השאלה"
                        
                 />

                <div className={Style.scoreContainer}>

                    <div className={Style.score}> ניקוד שאלה:</div>

                    <InputQuesForm
                            type="number"
                            propartype="score"
                            text="ניקוד"
                            style={{width: "100%", marginLeft: "-5px"}}
                            max="100"
                            min="0"
                    />
                </div>

                {
                    question.answers.map((answer, index) => {
                        return <AnswersForm idQuestion={question._id} answer={answer} index={index} key={answer._id} />
                    })

                }

                {
                    !question.answers.length ? 
                    <div>
                        <Icon 
                        style={{width: "100px", pading: "5px", borderRadius: "5px",
                            display: "flex",
                            justifyContent: "space-around", cursor: "pointer"
                        }}
                        backgroundColor="#037E8B"
                        color="#F3F2DC"
                        fontSize="12px"
                        icon="fas fa-plus"
                        text="הוספת תשובה"
                        margin="10px auto"
                        onClick={addAnswer}
                        />
                        {
                            lodingAns && 
                            <div className={Style.ldsRing}><div></div><div></div><div></div><div></div></div> 
                        }
                    </div>
                    
                    : null
                }




                
                {/* <button className={Style.btn} onClick={deleteQuestion}><i className="fas fa-trash"></i></button>
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
                <AnswersForm /> */}
            </QuestionContext.Provider>
            }
        </div>
    )
}
