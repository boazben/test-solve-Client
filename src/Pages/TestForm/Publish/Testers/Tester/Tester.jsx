import React, { useEffect, useState } from 'react'
import { serverReq } from '../../../../../functions'
import TesCSS from './Tester.module.css'

export default function Tester({user}) {
    const [profile, setProfile] = useState(user)
    useEffect(() => {
        getProfilers()
    }, [])

    async function getProfilers() {
        const res = await serverReq('post', '/get_profile', {"email": user.user_responds})
        setProfile(res)
    }

    
   

    return (
        <div className={TesCSS.container}>
            <div className={TesCSS.ProfilersContainer}>
                <div className={TesCSS.TesterImg} style={{ backgroundImage: `url(${profile.profilePicture || 'https://hook.finance/sites/default/files/user.png'})` }}></div>
                <span>{profile.fullName || "התלמיד לא רשום לאתר"}</span>
            </div>
            <span>{user.user_responds || "email@gmail.com"}</span>
        </div>
    )
}
