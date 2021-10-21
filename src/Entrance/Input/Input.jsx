import React, { useContext } from 'react'
import { WidthScreen } from '../../App/App'
import Style from './Input.module.css'

export default function Input({type, icon, placeholder, id, connect}) {

    const [width, setWidth] = useContext(WidthScreen)
    

    return (
        <>
        {
            connect ?

            <div className={`${Style.container} ${Style.connect}`}>
                <i className={`${icon} ${Style.icon}`}></i>
                <input id={id} name={id} type={type} className={`${Style.input}`} placeholder={placeholder} required />
                <div className={Style.side}></div>
            </div>
            :
            id.includes("firstName") && width > 768 ? 
            
            <div className={`${Style.container}`} style={{gridArea: `${id}`, justifySelf:"end", width:"19vw", marginLeft: "1vw"}}>
                <i className={`${icon} ${Style.icon}`}></i>
                <input id={id} name={id} type={type} className={`${Style.input}`} placeholder={placeholder} required />
                <div className={Style.side}></div>
            </div>
            :
            id.includes("lastName") && width > 768 ?
            <div className={`${Style.container}`} style={{gridArea: `${id}`, justifySelf:"start", width:"19vw", marginRight: "1vw"}}>
                <i className={`${icon} ${Style.icon}`}></i>
                <input id={id} name={id} type={type} className={`${Style.input}`} placeholder={placeholder} required />
                <div className={Style.side}></div>
            </div>
            :
            <div className={`${Style.container}`} style={{gridArea: `${id}`}}>
                <i className={`${icon} ${Style.icon}`}></i>
                <input id={id} name={id} type={type} className={`${Style.input}`} placeholder={placeholder} required />
                <div className={Style.side}></div>
            </div>

        }
        </>
    )
}
