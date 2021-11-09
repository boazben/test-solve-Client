import React, { createContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import InputForm from './InputForm/InputForm'
import Icon from '../../Components/Icon/Icon'
import TestSetting from './TestSetting/TestSetting'

export const TestFormContext = createContext()
export const PublishPopupContext = createContext()

export default function TestForm() {

    const [test, setTest] = useState()
    const { testId } = useParams()
    const [lodingAdd, setLodingAdd] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    // const [popup, setPopup] = useState(false)
    // const [publishPopup, setPublishPopup] = useState(false)
    
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

    async function addQuestion() {
        setLodingAdd(true)
        try {
            await serverReq('put', '/create_question', {"idTest": test._id})
            const res = await serverReq('post', '/test-form', { "idTest": test._id })
            // Promise.all([updateTest, res]).then((responses) => {
                //     setTest(responses[1])
                // })
                setTest(res)
                setLodingAdd(false)
            } catch (error) {
                console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            }
    }

    function change(e) {
        if (e.target == e.currentTarget) {
            setDropdown(!dropdown)
        }
    }



    return (
        <>
            
            
            {
                !test ? <Loding text="טוען מבחן..." /> :
                <TestFormContext.Provider value={[test, setTest]}>
                <main className={Style.mainContainer}>
                    <h1 className={`${Style.title} ${Style.mobile}`}>טופס ליצירת מבחן</h1>

                    <div className={Style.iconsGroupWarp}>
                        <ul className={`${Style.iconsGroup}`}>
                            <li className={Style.icon} ><i className="fa fa-share-alt"></i></li>
                            <li className={Style.icon}><i className="fas fa-chart-pie"></i></li>
                            <li className={Style.icon}><Link to={`/test/${test._id}`}><i className="far fa-eye"></i></Link></li>
                            <li className={`${Style.icon}`} ><i className={`fas fa-cog ${Style.dropdown}`}  onClick={(e) => change(e)}>{dropdown && <TestSetting />}</i></li>
                        </ul>
                    </div>

                    <InputForm
                        type="text"
                        propartype="name"
                        text="שם מבחן"
                    />

                    <InputForm
                        type="text"
                        propartype="title"
                        text="כותרת מבחן"
                    />

                    <InputForm
                        type="text"
                        propartype="description"
                        text="תיאור המבחן (הסבר קצר)"
                    />

                    {
                        test.questions.map((question, index) => {
                            return <QuestionForm question={question} index={index} key={question._id} />
                        })
                    }

                    {
                    lodingAdd && 
                    <div className={Style.ldsRing}><div></div><div></div><div></div><div></div></div> 
                    }  
                    {
                        <Icon 
                        backgroundColor="#037E8B"
                        color="#F3F2DC"
                        fontSize="16px"
                        icon="fas fa-plus"
                        text="הוספת שאלה"
                        margin="10px auto"
                        style={{borderRadius: "10px", width: "150px", padding: "5px 0 5px 0",
                        display: "flex", justifyContent: "space-around", cursor: "pointer"
                    }}
                        onClick={addQuestion}
                        />
                    }   


                </main>







                    {/* <PublishPopupContext.Provider value={[publishPopup, setPublishPopup]}>
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
                    </PublishPopupContext.Provider> */}
                </TestFormContext.Provider>
            }

        </>
    )
}
