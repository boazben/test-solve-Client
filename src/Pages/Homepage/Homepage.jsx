import React from 'react'
import { Link } from 'react-router-dom'
import Content from './Icon/Icon'
import Style from './Homepage.module.css'

export default function Homepage() {
    return (
        <main className={Style.homepage}>
            {/* The First div */}
            <div className={Style.firstDiv}>
                <div className={`${Style.description} ${Style.description1}`}>
                    <div className={` ${Style.content}${Style.content1}`}>
                        <h1 className={`${Style.title} ${Style.title1}`}> בית ספר דיגיטלי</h1>
                        <h2 className={`${Style.subtitle} ${Style.subtitle1}`}>הלמידה מעולם לא היתה מתקדמת יותר</h2>
                        <Link to="/my-created"><button className={`${Style.button} ${Style.button1}`} >ליצירת מבחן ראשון</button></Link>

                    </div>
                </div>
                <div className={`${Style.img} ${Style.img1}`}>
                    
                </div>
                
            </div>


            <div className={`${Style.secondDiv}`}>
                <div className={`${Style.description} ${Style.description2}`}>
                    <div className={` ${Style.content}${Style.content2}`}>
                        <h1 className={`${Style.title} ${Style.title2}`}> על הפרויקט</h1>
                        <h2 className={`${Style.subtitle} ${Style.subtitle2}`}>המערכת שלנו יודעת להעניק לכם את חווית הלמידה המתקדמת ביותר בזכות טכנולוגיה מתקדמת ומעבר ללמידה מקוונת</h2>
                        <Link to="/login"><button className={`${Style.button} ${Style.button2}`} >הצטרפו אלינו</button></Link>
                    </div>
                    <div className={Style.iconsLine}>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}
