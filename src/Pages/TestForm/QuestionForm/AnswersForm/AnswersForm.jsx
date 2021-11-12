import React, { useContext, useEffect, useRef, useState } from 'react'
import Checkbox from '../../../../Components/Checkbox/Checkbox'
import Icon from '../../../../Components/Icon/Icon'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import InputQuesForm from '../InputQuesForm/InputQuesForm'
import { QuestionContext } from '../QuestionForm'
import Style from'./AnswersForm.module.css'
import InputAnsForm from './InputAnsForm/InputAnsForm'
import OneAnsForm from './OneAnsForm/OneAnsForm'

export default function AnswersForm({answer, index, idQuestion}) {
    const [deleteAns, setDeleteAns] = useState(false)
    const [test, setTest] = useContext(TestFormContext)
    const [loding, setLoding] = useState(false)
    const form = useRef(null)

    function ifLast() {
        const answersAmount = test?.questions?.find((question) => question._id === idQuestion)?.answers?.length
        return answersAmount === index + 1
    }

    
    
    
    const counter = ["א", "ב", "ג", "ד", "ה","ו", "ז", "ח","ט", "י"]

    useEffect(() => {
        console.log('This is changed!');
    }
    , [deleteAns])

    async function deleteAnswer() {
        setLoding(true)
        try {
            await serverReq('put', '/edit_question', {"idQuestion": idQuestion, "newData": {"answer": {"_id": answer._id, "active": "false"}}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            console.log(res);
            setTest(res)
            setLoding(false)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }

    async function addAnswer() {
        setLoding(true)
        try {
            await serverReq('put', '/edit_question', {"idQuestion": idQuestion, "newData": {"answer": {"text": "", "correct": false}}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
            setLoding(false)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
}

    async function ifCorrectAnswer(e) {
        e.preventDefault();
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
        console.log(values[answer._id + "check"]);
        setLoding(true)
        try {
            await serverReq('put', '/edit_question', {"idQuestion": idQuestion, "newData": {"answer": {"_id": answer._id, "correct": values[answer._id + "check"]}}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
            setLoding(false)
        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
}



    
    return (
        <div className={Style.container} style={(test.status.includes("Closed")) ? {justifyContent: "flex-start"} : null}>
            {
                test.status.includes("Started") || (test.status.includes("Closed")) ?
                <div className={`${Style.answerSquare} ${answer.correct ? Style.after : null}`}></div>
                :
                <form ref={form} onSubmit={e => ifCorrectAnswer(e)} >
                    <Checkbox 
                    id={answer._id + "check"} 
                    defaultChecked={answer.correct} 
                    onClick={() => form.current.requestSubmit()} 
                    inputStyle={{position: "absulut", right: "-30px"}}
                    >
                        <span className={Style.number}>{counter[index]}.</span> 
                    </Checkbox>
                </form>
            }
            {
                (test.status.includes("Closed")) ? 
                <h3 className={Style.textStatus}>{answer.text}</h3>
                :
                <InputAnsForm 
                     type="text"
                     propartype="text"
                     text={`תשובה ${counter[index]}`}
                     index={index}
                     idQuestion={idQuestion}
                     answer={answer}
                     style={{width: "100%", marginLeft: "-5px"}}
                />

            }

            {
            
            !test.status.includes("Started") && !(test.status.includes("Closed")) &&
            <div className={Style.iconsContainer}>
                <Icon
                style={{cursor: "pointer"}} 
                backgroundColor="#E57462"
                size="16px"
                color="#F3F2DC"
                fontSize="7px"
                icon="fas fa-trash"
                onClick={deleteAnswer}
                />
                {
                    ifLast() &&
                    <Icon
                    style={{cursor: "pointer"}} 
                    backgroundColor="#037E8B"
                    size="16px"
                    color="#F3F2DC"
                    fontSize="8px"
                    icon="fas fa-plus"
                    margin="2px 0 0 0"
                    onClick={addAnswer}
                    />
                }

                {
                    loding && 
                   <div className={Style.ldsRing}><div></div><div></div><div></div><div></div></div> 
                }
            
             </div>
            }
        </div>
    )
}
