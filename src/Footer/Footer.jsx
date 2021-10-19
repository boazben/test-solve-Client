import React from 'react'
import Style from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={Style.footer}>
            <div className={Style.icons}>
                <a className={Style.a} href="https://www.linkedin.com/in/boaz-ben-david-234221217/"  target="_blank"><i className={`fab fa-linkedin ${Style.linkedin} ${Style.icon}`}></i></a> 
                <a className={Style.a} target="_blank" href="https://github.com/boazben/test-solve"><i className={`fab fa-github-square ${Style.github} ${Style.icon}`}></i></a>
                <a className={Style.a} target="_blank" href="https://wa.me/972547534244?text=שלום+בעז%2C+הגעתי+אליך+דרך+האתר+של+המבחנים.+אשמח+ליצור+איתך+קשר"><i className={`fab fa-whatsapp-square ${Style.whatsapp} ${Style.icon}`}></i></a>
                <a className={Style.a} href="https://www.facebook.com/profile.php?id=100043083559811" target="_blank"><i className={`fab fa-facebook-square ${Style.linkedin} ${Style.icon}`}></i></a>
                

            </div>

            <div className={Style.creator}>
            Created by <a className={Style.creatorLink} href="https://www.linkedin.com/in/boaz-ben-david-234221217/"  target="_blank"> Boaz Ben-David</a> <i className="far fa-copyright"> 2021</i> 
            </div>
        </footer>
    )
}
