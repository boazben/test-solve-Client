import React from 'react'
import Style from './About.module.css'
import ConnectIcon from './ConnectIcon/ConnectIcon'

export default function About() {
    return (
        <div className={Style.container}>
           <header className={Style.header}>
               <div className={Style.canvas}></div>
               <div className={Style.connectContainer}>
                <div className={Style.profileImage}></div>
                <div className={Style.title}>
                    <h1>בעז בן-דוד</h1>
                    <h2>מתכנת Full Stack</h2>
                </div>

                <div className={Style.iconsContainer}>
                        <div className={Style.iconsGroup}>
                            <a target="_blank" href="tel:0547534244" className="link"><ConnectIcon icon="fas fa-phone-alt">צלצלו</ConnectIcon></a>
                            <a target="_blank" className="link" href="https://wa.me/972547534244?text=שלום+בעז%2C+הגעתי+אליך+דרך+האתר+של+המבחנים.+אשמח+ליצור+איתך+קשר"><ConnectIcon icon="fab fa-whatsapp">שלחו הודעה </ConnectIcon></a>
                        </div>

                        <div className={Style.iconsGroup}>
                            {/* <a href="https://www.canva.com/design/DAExBSO8Vjw/b9CSkcJju4vLszX_Lg1zJA/view?utm_content=DAExBSO8Vjw&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton" className="link" target="_blank"><ConnectIcon icon="fas fa-file-alt">לקורות חיים </ConnectIcon></a> */}
                            <a href="https://drive.google.com/file/d/1Fxc8eJmdASCfAuidLRO4yyxM1kUdUOh5/preview"  className="link" target="_blank"><ConnectIcon icon="fas fa-file-alt">לקורות חיים </ConnectIcon></a>
                            <a href="https://www.linkedin.com/in/boaz-ben-david-234221217/" className="link" target="_blank"><ConnectIcon icon="fab fa-linkedin-in">לפרופיל </ConnectIcon></a>
                        </div>

                        <div className={Style.iconsGroup}>
                            <a href="https://github.com/boazben" className="link" target="_blank"><ConnectIcon icon="fab fa-github"> לפרופיל אחר</ConnectIcon></a>
                            <a target="_blank" className="link" href="mailto:boaz.bdqwe@gmail.com"><ConnectIcon icon="fas fa-envelope">שלחו אימייל </ConnectIcon></a>
                        </div>
                </div>               
               </div>
           </header>

            <main className={Style.main}>
                <div className={Style.upContainer}>
                    <div className={`${Style.textDiv} ${Style.firstDiv}`}>
                        <h3>בקצרה עליי</h3>
                        <br />
                        <p>
                            אני Junior Full Stack Developer שאוהב ללמוד ועם המון תשוקה לעולם מדעי המחשב ולעולם הפיתוח.
                            <br />
                            אני אוהב לעבוד קשה ולשפר את יכולות הפיתוח שלי לכתיבת קוד תקין, יעיל ונוח.
                            <br />
                            אני מחפש סביבת עבודה מקצועית ועם אנשים טובים שביחד נהפוך את העולם למקום טוב יותר.
                            <br />
                            אם אתם מגייסים בחברה שלכם, ומחפשים אנשים עם מוטיבציה להצלחה ומשמעת עצמית, אנשים עם אווירה וטובה ומקצועיות - מוזמנים ליצור איתי קשר בכל אחת מהפלטפורות.

                        </p>
                    </div>

                    <div className={`${Style.textDiv} ${Style.secondDiv}`}>
                        <h3>כישורים</h3>
                        <br />
                        <p>
                        <b>כישורים טכניים:</b>
                        <br />
                        יודע היטב:
                        JavaSrcipt, React Hooks, Node.js, express, mongoDB, Html, CSS.
                        <br />
                        מוכר:
                        Postman, Git, Github, Heroku, Python, SQL, IndexDB.
                        <br />
                        שפות: 
                        <br />
                        עברית – שפת אם.
                        <br />
                        אנגלית – רמה טובה.
                        <br /> <br />

                        <b>כישוריים רכים:</b>
                        <br />

                        כישורים חברתיים מצוינים, יכולת למידה עצמאית, התמדה, מסירות לעבודה.                   </p>
                        </div>
                </div>

                <div className={`${Style.textDiv} ${Style.thirdDiv}`}>
                    <h3>השכלה</h3>
                    <br />
                    <p>
                        <b>קורסים אינטרנטיים:</b><br />
                        צעדים ראשונים במדעי המחשב ותכנות בשפת פיתון. <br />
                        פיתון למתחילים ופיתון למתקדמים. <br />
                        מודל 5 השכבות ברשת האינטרנט. <br />
                        כרגע – קורס מבני נתונים. <br />
                        <br />
                        <b>לפי שנים:</b><br />
                        <b>כרגע –</b> Bs.C  - תואר ראשון במדעי המחשב באוניברסיטה הפתוחה. <br />
                        <br />
                        <b>2021-2022:</b> בניית הפרוייקט הנוכחי. <br />
                        חודשיים מלאים ואינטנסייבים של Bootcamp ב-Full Stack במכללת "Workin". המלצות על-פי דרישה. <br />
                        <br />
                        <b>2013-2015:</b> "ישיבה תיכונית חספין" תיכון פינמייתי. למידה אינטנסיבית מ-8:00-20:00.
                        בגרות מלאה עם הרחבה בפיזקה 5 יח"ל, ציון סופי 92. <br />
                        <br />
                        <b>2011-2014:</b> השתתפות בתוכנית לנוער מוכשר במתמטיקה, מטעם אוניברסיטת בר אילן. <br />
                        השלמת 5 יח"ל במתמטיקה בכיתה י"א, ציון סופי 93.

                    </p>
                    </div>

            </main>

        </div>
    )
}
