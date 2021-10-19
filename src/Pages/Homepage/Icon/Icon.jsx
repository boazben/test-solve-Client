import Style from './Icon.module.css'

export default function Icon({h1, h1Class, h2, btn}) {
    return (
        <div className={Style.description}>
            <div className={Style.content}>
                <h1 className={`${Style.titel} .h1Class`}> {h1}</h1>
                <h2 className={Style.subtitle}>{h2}</h2>
                <button className={Style.button}>{btn}</button>

            </div>
        </div>
        
    )
}
