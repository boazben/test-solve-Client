import React from 'react'
import { Link } from 'react-router-dom'
import Content from './Icon/Icon'
import Style from './Homepage.module.css'
import Icon from './Icon/Icon'

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
                        <Link to="/register"><button className={`${Style.button} ${Style.button2}`} >הצטרפו אלינו</button></Link>
                    </div>
                    <div className={Style.iconsLine}>
                        <div className={Style.iconsGroup}>
                            <Icon icon={"fa-running"} text={'מהירות ונגישות בכל במקום '}/>
                            <Icon icon={"fa-dollar-sign"} text={'חיסכון בעלויות יקרות של המוסד'}/>
                        </div>
                        <div className={Style.iconsGroup}>
                            <Icon icon={"fa-chart-line"} text={'התקדמות משמעותית לתלמיד'}/>
                            <Icon icon={"fa-book-reader"} text={'מערכת ידידותית ומתקדמת'}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={Style.thirdDiv}>
                <div className={`${Style.img}  ${Style.topLeft}`}></div>
                <div className={`${Style.img} ${Style.topRight}`}>

                    <div className={` ${Style.content} ${Style.content3}`}>
                        <h1 className={`${Style.title} ${Style.title3}`}> למידה עצמאית</h1>
                        <h2 className={`${Style.subtitle} ${Style.subtitle3}`}>למידה בקצב האישי בזמן האישי ללא הפרעות</h2>
                        <Link to="/register" ><button className={`${Style.button} ${Style.button3}`} >הצטרפו לחדשנות</button></Link>
                    </div>

                </div>
                <div className={`${Style.img} ${Style.bottomLeft}`}>

                    <div className={` ${Style.content} ${Style.content3}`}>
                        <h1 className={`${Style.title} ${Style.title3}`}>סקרנות </h1>
                        <h2 className={`${Style.subtitle} ${Style.subtitle3}`}>פיתוח הסקרנות להיכנס לעומק לחקור</h2>
                        <Link to="/my-tests"><button className={`${Style.button} ${Style.button3}`} >צפו במבחנים</button></Link>
                    </div>

                </div>
                <div className={`${Style.img} ${Style.bottomRight}`}></div>
            </div>
        </main>
    )
}
