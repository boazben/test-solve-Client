import React from 'react'
import Style from './SmallLoding.module.css'

export default function SmallLoding({state}) {
    const [loding, setLoding] = state

    return (
        <>
        {
            loding &&
            <div className={Style.ldsRing}><div></div><div></div><div></div><div></div></div>
        }
        </>
    )
}
