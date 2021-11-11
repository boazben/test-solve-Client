import React, { useEffect, useState } from 'react'
import { serverReq } from '../../../../../functions'
import Style from './Tester.module.css'

export default function Tester({user}) {
    return (
        <div className={Style.container}>
            <div className={Style.ProfilersContainer}>
                {
                    user.user_responds?.profilePicture ?
                    <div className={Style.TesterImg} style={{ backgroundImage: `url(${user?.user_responds?.profilePicture || 'https://hook.finance/sites/default/files/user.png'})` }}></div>
                    :
                    <div className={Style.TesterIcon}><i className="fas fa-user"></i></div>
                }
                
                <span className={Style.name}>{user.user_responds?.name ? `${user.user_responds.name.first} ${user.user_responds.name.last}` : "משתמש לא רשום"}</span>
            </div>
            <span className={Style.email}>{user.user_responds?.email || user.user_responds}</span>
        </div>
    )
}
