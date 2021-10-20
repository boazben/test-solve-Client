import React from 'react'
import Style from './Footer.module.css'
import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <footer className={Style.footer}>
            <div className={Style.separator}></div>
            <div className={Style.container}>

            {/* Logo */}
                <Link to="/" className={`${Style.logoContainer} ${Style.Link}`}>
                    <div className={Style.logo}>
                        <i className="fas fa-university"></i>
                    </div>
                    <div className={Style.logoTextContainer}>
                            <div className={Style.logoName}>TESTUDY</div>
                            <div className={Style.logoDescription}>Education</div>
                    </div>
                </Link>


                {/* Navigator */}
                <div className={Style.nav}>
                    <h3 className={Style.title}>ניווט מהיר</h3>
                    <Link to="//my-created" className={Style.Link}>יצירת מבחנים</Link>
                    <Link to="/my-tests" className={Style.Link}>המבחנים שלי</Link>
                    <Link to="/website-information" className={Style.Link}>על הפרויקט</Link>
                    <Link to="/about" className={Style.Link}>מי אנחנו?</Link>
                    <Link to="/register" className={Style.Link}>הרשמה</Link>
                </div>

                {/* Social Networks */}
                <div className={`${Style.nav} ${Style.socialNetworks}`}>
                <h3 className={Style.title}>מצא אותנו</h3>
                
                <div className={Style.iconsGroup}>
                    <div className={`${Style.top}`}>
                        <a target="_blank" href="https://www.linkedin.com/in/boaz-ben-david-234221217/" className={Style.Link}><i className={`fab fa-linkedin ${Style.linkedin} ${Style.icon}`}></i></a>
                        <a target="_blank"  href="https://github.com/boazben" className={Style.Link}><i className={`fab fa-github-square ${Style.github} ${Style.icon}`}></i></a>
                    </div>
                    <div className={`${Style.bottom}`}>
                        <a target="_blank" href="https://www.facebook.com/profile.php?id=100043083559811" className={Style.Link}><i className={`fab fa-facebook-square ${Style.linkedin} ${Style.icon}`}></i></a>
                        <a target="_blank" href="https://wa.me/972547534244?text=שלום+בעז%2C+הגעתי+אליך+דרך+האתר+של+המבחנים.+אשמח+ליצור+איתך+קשר" className={Style.Link}><i className={`fab fa-whatsapp-square ${Style.whatsapp} ${Style.icon}`}></i></a>
                    </div>
                </div>
                   
                </div>

                {/* Contect */}
                <div className={`${Style.nav} ${Style.contect}`}>
                <h3 className={Style.title}>צור קשר</h3>
                    <a target="_blank" href="https://www.linkedin.com/in/boaz-ben-david-234221217/" className={Style.Link}>בעז בן דוד</a>
                    <a target="_blank" href="tel:0547534244" className={Style.Link}>054-7534244</a>
                    <div  className={Style.Link}>ירושלים, ישראל</div>
                    <a target="_blank" href="mailto:boaz.bdqwe@gmail.com" className={Style.Link}>Boaz.bdqwe@gmail.com</a>
                </div>

            </div>

            {/* Copiriting by */}
            

            <div className={Style.creator}>
             by <a className={`${Style.Link} ${Style.creatorName}`} href="https://www.linkedin.com/in/boaz-ben-david-234221217/"  target="_blank"> Boaz Ben-David. Full Stack Developer</a> <i className="far fa-copyright"> 2021</i> 
            </div>








            {/* <div className={Style.icons}>
                <a className={Style.a} href="https://www.linkedin.com/in/boaz-ben-david-234221217/"  target="_blank"><i className={`fab fa-linkedin ${Style.linkedin} ${Style.icon}`}></i></a> 
                <a className={Style.a} target="_blank" href="https://github.com/boazben/test-solve"><i className={`fab fa-github-square ${Style.github} ${Style.icon}`}></i></a>
                <a className={Style.a} target="_blank" href="https://wa.me/972547534244?text=שלום+בעז%2C+הגעתי+אליך+דרך+האתר+של+המבחנים.+אשמח+ליצור+איתך+קשר"><i className={`fab fa-whatsapp-square ${Style.whatsapp} ${Style.icon}`}></i></a>
                <a className={Style.a} href="https://www.facebook.com/profile.php?id=100043083559811" target="_blank"><i className={`fab fa-facebook-square ${Style.linkedin} ${Style.icon}`}></i></a>
                

            </div>

            <div className={Style.creator}>
            Created by <a className={Style.creatorLink} href="https://www.linkedin.com/in/boaz-ben-david-234221217/"  target="_blank"> Boaz Ben-David</a> <i className="far fa-copyright"> 2021</i> 
            </div> */}
        </footer>
    )
}
