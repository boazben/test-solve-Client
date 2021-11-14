import React, { useContext, useRef } from 'react'
import { UserContext } from '../../../Entrance/Entrance';
import { serverReq } from '../../../functions';
import Style from './InputSitting.module.css'

export default function InputSitting({text, propartype }) {
    const form = useRef(null)
    const [user, setUser] = useContext(UserContext)
    

    async function submit(e) {
        e.preventDefault();
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
        try {
            const updateUser = propartype === 'first' ?
            await serverReq('put', '/edit_user', {"data": {"name": {"first": values.input, "last": user.name.last}}})
            :
            await serverReq('put', '/edit_user', {"data": {"name": {"first": user.name.first, "last": values.input}}})  
            console.log(updateUser);
            setUser(updateUser)
        } catch (error) {
            // throw error
            console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }

    return (
        <div className={Style.container}>
        <form title={text} ref={form} className={`${Style.containerForm} ${user.name[propartype] ? Style.filled  : null  }`} onSubmit={(e) => submit(e)}>
           
                <i className={`fas fa-pencil-alt ${Style.icon}`}></i>

                <input className={`${Style.input}`}
                id={`${user._id}${propartype}`}
                type="input"
                placeholder={text}
                name="input"
                defaultValue={user.name[propartype] }
                onFocus={e => e.target.select()} 
                onBlur={() => form.current.requestSubmit()}
                />

            
        </form>
        <label className={Style.label} htmlFor={`${user._id}${propartype}`}>{text}</label>

        </div>
    )
}
