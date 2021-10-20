import Style from './Icon.module.css'

export default function Icon({icon ,text}) {
    return (
        <div className={Style.container}>
            <i className={`fas ${icon}`}></i>
            <div className={Style.description}>
                {text}
            </div>
        </div>
        
    )
}
