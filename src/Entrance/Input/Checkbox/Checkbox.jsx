import { useContext } from 'react'
import { WidthScreen } from '../../../App/App'
import Style from './Checkbox.module.css'

export default function Checkbox({id, defaultChecked, text}) {

    const [width] = useContext(WidthScreen)

    return (
        <>
        {
          id.includes("conntectNow") &&  width > 768 ?
          
        <div className={Style.container} style={{gridArea: `${id}`, justifySelf: "end", marginLeft:"5vw"}}>
            <input className={Style.checkbox} id={id} type="checkbox" name={id} defaultChecked={defaultChecked}/>
            <label className={Style.checkboxLabel} htmlFor={id}>{text}</label>
        </div>
        : id.includes("stayConnected") &&  width > 768 ?
        <div className={Style.container} style={{gridArea: `${id}`, justifySelf: "start", marginRight: "2vw"}}>
            <input className={Style.checkbox} id={id} type="checkbox" name={id} defaultChecked={defaultChecked}/>
            <label className={Style.checkboxLabel} htmlFor={id}>{text}</label>
        </div>
        :
        <div className={Style.container} style={{gridArea: `${id}`}}>
            <input className={Style.checkbox} id={id} type="checkbox" name={id} defaultChecked={defaultChecked}/>
            <label className={Style.checkboxLabel} htmlFor={id}>{text}</label>
        </div>

        }
        </>
    )
}
