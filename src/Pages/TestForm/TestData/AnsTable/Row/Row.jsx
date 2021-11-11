import React, { useState, useRef, useContext } from 'react'
import {Link} from 'react-router-dom'
import { ExamineesContext } from '../../TestData'
import Style from './Row.module.css'

export default function Row({user}) {
    const [showInfo, setShowInfo] = useState(false)
    const color = useRef({
        'Not Open': Style.NotOpen,
        'In Doing': Style.InDoing,
        Done: Style.Done,
        Closed: Style.Closed
    })

    function translateStatus(status) {
        return user.status === 'In Doing' ? "בעשייה" : user.status === 'Done' ? "נעשה" : user.status === 'Not Open' ? "לא נפתח" : "סגור"
    }

    


    return (
        <div className={`${Style.rowContainer} ${color.current[user.status]}`}>
        <tr className={showInfo ? Style.bold : null}>
            <td  className={`${Style.center} mobile`} onClick={() => setShowInfo(!showInfo)}><div className={`${Style.dropdownIcon} ${showInfo && Style.dropdownItem}`}><i className="fas fa-sort-down"></i></div> </td>
            <td className="center">
                {
                    user?.user_responds?.profilePicture ? 
                    <div className={Style.img} style={{ backgroundImage: `url(${user?.user_responds?.profilePicture})` }}></div>
                    :
                    <div className={Style.icon}><i className="fas fa-user"></i></div>
                }
                
            </td>
            <td >{user?.user_responds?.name ? `${user.user_responds.name.first} ${user.user_responds.name.last}` : "לא רשום"}</td>
            <td className="webTable"> {user.grade}</td>
            <td className="webTable"> {user.submissionDate ? (new Date(user.submissionDate)).toLocaleDateString('en-GB') : "ללא תאריך הגשה"}</td>
            <td className="webTable"> {user?.user_responds?.email || user.user_responds}</td>
            <td className="webTable"><Link><i className="far fa-eye"></i></Link></td>
            {/* <td className="webTable pointer" onClick={() => setPopup(true)}><i className="fas fa-trash"></i> למחוק</td> */}
        </tr>

      {
          showInfo &&
          <>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="far fa-envelope"></i></td>
              <td>אימייל</td>
              <td>{user?.user_responds?.email || user.user_responds}</td>
              
          </tr>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-graduation-cap"></i></td>
              <td>ציון</td>
              <td>{user.grade}</td>
              
          </tr>

          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-calendar-week"></i></td>
              <td>תאריך הגשה</td>
              <td>{user.submissionDate ? (new Date(user.submissionDate)).toLocaleDateString('en-GB') : "ללא תאריך הגשה"}</td>
              
          </tr>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="far fa-eye"></i></td>
              <td>לצפייה</td>
              <td><Link>פתרון המבחן</Link></td>
              
          </tr>
          {/* <tr className={Style.dropdown}>
                <td className={Style.center}><i className="fas fa-link"></i></td>
                <td>קישור</td>
                <td>
                  {
                      user.status.includes("Edited") || user.status.includes("Distributed") ?
                      <Link to={`/test-form/${test._id}`} className={`${color.current[user.status]}`}><i className="fas fa-pencil-alt"></i> לערוך</Link>
                      : 
                      <Link to={`/test-form/${test._id}`} className={`${color.current[user.status]}`}><i className="far fa-eye"></i> לצפייה</Link>
                  }
                </td>
              
          </tr>

          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-exclamation-triangle"></i></td>
              <td>מחיקת מבחן</td>
              <td className="pointer" onClick={() => setPopup(true)}><i className="fas fa-trash"></i> למחוק</td>
              
          </tr> */}
          <tr>
              <td></td>
          </tr>
          </>
      }
      
      </div>
    )
}
