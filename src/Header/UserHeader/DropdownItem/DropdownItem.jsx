import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Style from './DropdownItem.module.css'

export default function DropdownItem({children, icon, toPage}) {
   

    return(
      <Link to={toPage || "/"} className={Style.item}>
        <div className={Style.backgroundIcon}>
          <i className={icon}></i>
        </div>
        <div className={Style.text}>
          {children}
        </div>
      </Link>
    )
  }
