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
import TestData from './TestData/TestData'

export const TestFormContext = createContext()
export const PublishPopupContext = createContext()

export default function TestForm() {

    const [test, setTest] = useState()
    const { testId } = useParams()
    const [lodingAdd, setLodingAdd] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [publishPopup, setPublishPopup] = useState(false)
    const [testData, setTestData] = useState(false)
    
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

    function setState(e, state, setState) {
        if (e.target === e.currentTarget) {
            setState(!state)
        }
    }



    return (
        <>
            
            
            {
                !test ? <Loding text="טוען מבחן..." /> :
                <TestFormContext.Provider value={[test, setTest]}>
                <main className={Style.mainContainer}>
                    {
                        (test.status.includes("Started") || (test.status.includes("Closed"))) && 
                        <>
                            <h2 className={`${Style.status}`}>{`סטטוס מבחן: "${test.status_he}".`} </h2>
                            <h2 className={`${Style.status}`}>{`לא ניתן לערוך חלקים מסוימים במבחן.`} </h2>
                        </>
                    }
                    <h1 className={`${Style.title} ${Style.mobile}`}>טופס ליצירת מבחן</h1>

                    <div className={Style.iconsGroupWarp}>
                        <ul className={`${Style.iconsGroup}`}>
                            <li className={Style.icon} style={publishPopup ? {zIndex: '5'} : {zIndex: '0'}}><i className="fa fa-share-alt" onClick={(e) => setState(e, publishPopup, setPublishPopup)}>{publishPopup && <Publish state={[publishPopup, setPublishPopup]}/>}</i></li>
                            <li className={Style.icon}  style={testData ? {zIndex: '5'} : {zIndex: '0'}}><i className="fas fa-chart-pie" onClick={(e) => setState(e, testData, setTestData)}>{testData && <TestData state={[testData, setTestData]}/>}</i></li>
                            <li><Link className={Style.icon}  to={`/test/${test._id}`}><i className="far fa-eye"></i></Link></li>
                            <li className={`${Style.icon}`} style={dropdown ? {zIndex: '4'} : {zIndex: '0'}}><i className={`fas fa-cog ${Style.dropdown}`}  onClick={(e) =>  setState(e, dropdown, setDropdown)}>{dropdown && <TestSetting />}</i></li>
                        </ul>
                    </div>

                    {
                        test.status.includes("Started") || (test.status.includes("Closed")) ?
                        <h3>{`שם מבחן: ${test.name || "המבחן הופץ ללא שם"}`}</h3>
                        :
                        <InputForm
                            type="text"
                            propartype="name"
                            text="שם מבחן"
                        />
                    }

                    {
                       (test.status.includes("Closed")) ?
                       <h3>{`כותרת מבחן: ${test.title || "המבחן הופץ ללא כותרת"}`}</h3>
                       :
                        <InputForm
                        type="text"
                        propartype="title"
                        text="כותרת מבחן"
                        />
                    }

                    {
                       (test.status.includes("Closed")) ?
                       <h3>{`תיאור: ${test.description || "המבחן הופץ ללא תיאור"}`}</h3>
                       :
                       <InputForm
                       type="text"
                       propartype="description"
                       text="תיאור המבחן (הסבר קצר)"
                        />
                    }

                   

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
                        !test.status.includes("Started") && !(test.status.includes("Closed")) &&
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
                </TestFormContext.Provider>
            }

        </>
    )
}
