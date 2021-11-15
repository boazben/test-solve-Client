import React, { useContext, useState } from 'react'
import SmallLoding from '../../../../Components/Loding/SmallLoding'
import { serverReq } from '../../../../functions'
import { LodingContext, TestFormContext } from '../../TestForm'
import Style from './MenuTestLink.module.css'

export default function MenuTestLink() {
    const [test, setTest] = useContext(TestFormContext)
    const [generalLoding, setGeneralLoding] = useContext(LodingContext)
    const [link, setLink] = useState(test.toShared)
    const [lodnig, setLoding] = useState(false)


    async function submit() {
        setLoding(true)
        setGeneralLoding(true)
        try {
            await serverReq('put', '/edit_test', {"idTest": test._id, "newData": {toShared: !link}})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            console.log(res);
            setLink(!link)
            setTest(res)
            setLoding(false)
            setGeneralLoding(false)
        } catch (error) {
            setLoding(false)
            throw error
            // console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }

    return (
        <div className={Style.container}>
            <i className="fas fa-share-alt"></i>
            <SmallLoding state={[lodnig, setLoding]} />
            <div className={Style.showState} onClick={submit}>
                <div className={!link ? `${Style.block} ${Style.left}` : `${Style.block} ${Style.right}`}></div>
                <span className={!link ? `${Style.show} ${Style.rightText}` : `${Style.show} ${Style.leftText}`}>{link? 'שיתוף בלניק': 'בהזמנה בלבד'}</span>
            </div>
        </div>
    )
}
