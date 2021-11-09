import React, { useContext, useRef } from 'react'
import { serverReq } from '../../../../../functions'
import { TestFormContext } from '../../../TestForm'
import Style from './InputAnsForm.module.css'

export default function InputAnsForm({text, type, min, propartype, max, index, style, idQuestion, answer}) {
    const form = useRef(null)
    const [test, setTest] = useContext(TestFormContext)
    
    

    async function submit(e) {
        e.preventDefault();
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
        console.log(values.text);
        try {
            await serverReq('put', '/edit_question', {"idQuestion": idQuestion, "newData": {"answer": {"_id": answer._id, "text": values.text }}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            setTest(res)
        } catch (error) {
            throw error
            // console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }

    return (
        <form title={text} ref={form} className={`${Style.containerForm} ${answer[propartype] ? Style.filled  : null  }`} onSubmit={(e) => submit(e)} style={style}>
            <i className={`fas fa-pencil-alt ${Style.icon}`}></i>

            <input className={`${Style.input}`}
            type={type}
            placeholder={text}
            name="text"
            defaultValue={answer[propartype] }
            onFocus={e => e.target.select()} 
            onBlur={() => form.current.requestSubmit()}
            max={max}
            min={min}
             />
            
        </form>
    )
}
