import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loding from '../../Components/Loding/Loding'
import { serverReq } from '../../functions'
import DescriptionForm from './DescriptionForm/DescriptionForm'
import AddQuestion from './AddQuestion/AddQuestion'
import Style from './TestFormStyle.module.css'
import TitelForm from './TitelForm/TitelForm'
import QuestionForm from './QuestionForm/QuestionForm'
import MenuTestForm from './MenuTestForm/MenuTestForm'
import Publish from './Publish/Publish'
import Popup from '../../Components/Popup/Popup'

export const TestFormContext = createContext()
export const PublishPopupContext = createContext()

export default function TestForm() {

    const [test, setTest] = useState()
    const { testId } = useParams()
    const [popup, setPopup] = useState(false)
    const [publishPopup, setPublishPopup] = useState(false)
    
    useEffect(() => {
        getTest()
    }, [])

    async function getTest() {
        try {
            const res = await serverReq('post', '/test-form', { "idTest": testId })
            console.log(res);
            setTest(res)
        } catch (error) {
            throw error 
            // console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
        }
    }



    return (
        <>
            
            
            {
                !test ? <Loding text="טוען מבחן..." /> :
                <TestFormContext.Provider value={[test, setTest]}>
                    <PublishPopupContext.Provider value={[publishPopup, setPublishPopup]}>
                        <Publish/>
                    <div className={Style.testFormContainer}>
                        <div className={Style.headerTestForm}>
                            <div className={Style.titelFormContainer}>
                                {test.status.includes('Started') || test.status.includes('Closed') ? 
                                <div>
                                    <h1 className={Style.message}>
                                        {`סטטוס המבחן: "${test.status_he}".`}
                                        <br />
                                         {`לא ניתן לערוך חלקים במבחן.`}
                                    </h1>
                                    <button className={Style.btn} onClick={() =>setPopup(true)}>למידע נוסף</button>
                                    {popup ? < Popup state={[popup, setPopup]} title="עריכת מבחן שהופץ" message={"לאחר פרסום המבחן, ניתן לערוך את המבחן רק במידה ולא התחילו להשיב על המבחן. מהרגע שהמשיב הראשון התחיל את המבחן, לא ניתן למחוק שאלות, להוסיף, או לערוך. ניתן לשנות רק כותרות, תיאורים והסברים. בהצלחה!"} btnText={"אוקיי, הבנתי"} /> : null}
                                </div>
                                : null
                                }
                                <TitelForm />
                                <DescriptionForm />
                                <AddQuestion />
                            </div>
                            <div className={Style.menuTestForm}>
                                <MenuTestForm />
                            </div>
                        </div>
                        <div className={Style.QuestionsFormContainer}>
                            {
                                test?.questions?.map((question, index) => {
                                    return <QuestionForm key={question._id} idQuestion={question._id} index={index}/>
                                })   
                            }
                        </div>
                        
                    </div>
                    </PublishPopupContext.Provider>
                </TestFormContext.Provider>
            }

        </>
    )
}
