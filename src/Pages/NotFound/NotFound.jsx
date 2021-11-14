import React from 'react'
import { Link } from 'react-router-dom'
import Style from './NotFound.module.css'

export default function NotFound() {
    return (
        <div className={Style.container}>
            <div className={Style.img}></div>
            <div className={Style.directionContainer}>
                <div className={Style.direction}>
                    <div>
                        <h1>מצטערים</h1>
                        <h2>אך הדף אינו קיים</h2>
                    </div>
                    <Link to="/"><button className={`${Style.button} ${Style.button1}`}>חזרה לדף הבית</button></Link>

                </div>
            </div>
        </div>
    )
}
