import React, { useState, useRef, useContext } from 'react'
import {Link} from 'react-router-dom'
import { ExamineesContext } from '../../TestData'
import Style from './Row.module.css'

export default function Row({examinee}) {
    const [showInfo, setShowInfo] = useState(false)
    const color = useRef({
        'Not Open': Style.NotOpen,
        'In Doing': Style.InDoing,
        Done: Style.Done,
        Closed: Style.Closed
    })

    function translateStatus(status) {
        return examinee.status === 'In Doing' ? "בעשייה" : examinee.status === 'Done' ? "נעשה" : examinee.status === 'Not Open' ? "לא נפתח" : "סגור"
    }

    


    return (
        <div className={`${Style.rowContainer} ${color.current[examinee.status]}`}>
        <tr className={showInfo ? Style.bold : null}>
            <td  className={`${Style.center} mobile`} onClick={() => setShowInfo(!showInfo)}><div className={`${Style.dropdownIcon} ${showInfo && Style.dropdownItem}`}><i className="fas fa-sort-down"></i></div> </td>
            <td className="center">
                {
                    examinee?.user_responds?.profilePicture ? 
                    <div className={Style.img} style={{ backgroundImage: `url(${examinee?.user_responds?.profilePicture})` }}></div>
                    :
                    <div className={Style.icon}><i className="fas fa-user"></i></div>
                }
                
            </td>
            <td >{examinee?.user_responds?.name ? `${examinee.user_responds.name.first} ${examinee.user_responds.name.last}` : "לא רשום"}</td>
            {/* <td className="webTable"> {(new Date(examinee.created)).toLocaleDateString('en-GB')}</td> */}
            {/* <td className="webTable"> {examinee.deadline ? (new Date(examinee.deadline)).toLocaleDateString('en-GB') : "ללא דד-ליין"}</td> */}
            <td className="webTable"> {examinee?.user_responds?.email || examinee.user_responds}</td>
            <td className="webTable"><div className={`${color.current[examinee.status]}`}>{translateStatus(examinee.status)}</div></td>
            {/* <td className="webTable pointer" onClick={() => setPopup(true)}><i className="fas fa-trash"></i> למחוק</td> */}
        </tr>

      {
          showInfo &&
          <>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="far fa-envelope"></i></td>
              <td>אימייל</td>
              <td>{examinee?.user_responds?.email || examinee.user_responds}</td>
              
          </tr>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-info"></i></td>
              <td>סטטוס</td>
              <td>{translateStatus(examinee.status)}</td>
              
          </tr>
          {/* <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-calendar-week"></i></td>
              <td>תאריך יצירה</td>
              <td>{(new Date(examinee.created)).toLocaleDateString('en-GB')}</td>
              
          </tr>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-hourglass-half"></i></td>
              <td>דד-ליין</td>
              <td>{examinee.deadline ? (new Date(examinee.deadline)).toLocaleDateString('en-GB') : "ללא דד-ליין"}</td>
              
          </tr> */}
          {/* <tr className={Style.dropdown}>
                <td className={Style.center}><i className="fas fa-link"></i></td>
                <td>קישור</td>
                <td>
                  {
                      examinee.status.includes("Edited") || examinee.status.includes("Distributed") ?
                      <Link to={`/test-form/${test._id}`} className={`${color.current[examinee.status]}`}><i className="fas fa-pencil-alt"></i> לערוך</Link>
                      : 
                      <Link to={`/test-form/${test._id}`} className={`${color.current[examinee.status]}`}><i className="far fa-eye"></i> לצפייה</Link>
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
