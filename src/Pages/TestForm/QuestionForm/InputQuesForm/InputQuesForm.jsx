import React, { useContext, useRef } from 'react'
import { serverReq } from '../../../../functions';
import { TestFormContext } from '../../TestForm';
import { QuestionContext } from '../QuestionForm';
import Style from './InputQuesForm.module.css'

export default function InputQuesForm({text, type, min, propartype, max, style}) {
    const form = useRef(null)
    const [test, setTest] = useContext(TestFormContext)
    const question = useContext(QuestionContext)

    async function submit(e) {
        e.preventDefault();
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
        try {
            await serverReq('put', '/edit_question', {"idQuestion": question._id, "newData": {[propartype]: values.input}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
        } catch (error) {
            throw error
            // console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }

    return (
        <form title={text} ref={form} className={`${Style.containerForm} ${question[propartype] ? Style.filled  : null  }`} onSubmit={(e) => submit(e)} style={style}>
            <i className={`fas fa-pencil-alt ${Style.icon}`}></i>

            <input className={`${Style.input}`}
            type={type}
            placeholder={text}
            name="input"
            defaultValue={question[propartype] }
            onFocus={e => e.target.select()} 
            onBlur={() => form.current.requestSubmit()}
            max={max}
            min={min}
             />
            
        </form>
    )
}
