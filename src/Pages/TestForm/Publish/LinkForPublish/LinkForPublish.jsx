import React, { useContext, useRef, useState } from 'react'
import Icon from '../../../../Components/Icon/Icon'
import { TestFormContext } from '../../TestForm'
import Style from './LinkForPublish.module.css'

export default function LinkForPublish() {
    const [test, setTest] = useContext(TestFormContext)
    const [copied, setCopied] = useState(false)
    const link = useRef(null)


    function copy() {
        navigator.clipboard.writeText(`${link.current.textContent}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 200)
    }

    return (
        <div className={Style.container}>
            <div className={Style.link} ref={link}>
                
                    {/* {`http://localhost:3000/test/${test._id}`}                */}
                    {`https://testudy.herokuapp.com/${test._id}`}               
                
            </div>
            <div onClick={copy}>
                <Icon 
                    backgroundColor="#E57462"
                    color="#F3F2DC"
                    fontSize={copied ? `16px` : `14px`}
                    icon="far fa-copy"
                    size={copied ? `30px` : `25px`}
                    // margin="10px auto"
                    style={{position: 'absolute', top: '20px', right: '-12px', zIndex: '200', transition: '200ms'}}
                    />

            </div>
        </div>
    )
}
