import React, { useContext, useState } from 'react'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import Style from './MenuTestLink.module.css'

export default function MenuTestLink() {
    const [test, setTest] = useContext(TestFormContext)
    const [link, setLink] = useState(test.toShared)


    async function submit() {
        setLink(!link)
        try {
            await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {toShared: link}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            console.log(res);
            setTest(res)
        } catch (error) {
            throw error
            // console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }

    return (
        <div className={Style.container}>
            <i className="fas fa-share-alt"></i>
            <div className={Style.showState} onClick={submit}>
                <div className={!link ? `${Style.block} ${Style.left}` : `${Style.block} ${Style.right}`}></div>
                <span className={!link ? `${Style.show} ${Style.rightText}` : `${Style.show} ${Style.leftText}`}>{!link? 'שיתוף בלניק': 'בהזמנה בלבד'}</span>
            </div>
        </div>
    )
}
