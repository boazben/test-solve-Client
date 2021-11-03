import React, { useState, useRef, useContext } from 'react'
import {Link} from 'react-router-dom'
import Popup from '../../../../Components/Popup/Popup'
import { DeleteTest } from '../TestsTable'
import Style from './Row.module.css'

export default function Row({test}) {
    const [showInfo, setShowInfo] = useState(false)
    const [popup, setPopup] = useState(false)
    const deleteTest = useContext(DeleteTest)
    const color = useRef({
        Edited: Style.Edited,
        Distributed: Style.Distributed,
        Started: Style.Started,
        Closed: Style.Closed
    })

    


    return (
        <div className={`${Style.rowContainer} ${color.current[test.status]}`}>
        <tr className={showInfo && Style.bold}>
            <td  className={`${Style.center} mobile`} onClick={() => setShowInfo(!showInfo)}><div className={`${Style.dropdownIcon} ${showInfo && Style.dropdownItem}`}><i className="fas fa-sort-down"></i></div> </td>
            <td >{test.name || 'ללא שם'}</td>
            <td >{test.status_he}</td>
            <td className="web"> {(new Date(test.created)).toLocaleDateString('en-GB')}</td>
            <td className="web"> {test.deadline ? (new Date(test.deadline)).toLocaleDateString('en-GB') : "ללא דד-ליין"}</td>
            <td className="web">
                {
                    test.status.includes("Edited") || test.status.includes("Distributed") ?
                    <Link to={`/test-form/${test._id}`} className={`${color.current[test.status]}`}><i className="fas fa-pencil-alt"></i> לערוך</Link>
                    : 
                    <Link to={`/test-form/${test._id}`} className={`${color.current[test.status]}`}><i className="far fa-eye"></i> לצפייה</Link>
                }
            </td>
            <td className="web pointer" onClick={() => setPopup(true)}><i className="fas fa-trash"></i> למחוק</td>
        </tr>

      {
          showInfo &&
          <>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-calendar-week"></i></td>
              <td>תאריך יצירה</td>
              <td>{(new Date(test.created)).toLocaleDateString('en-GB')}</td>
              
          </tr>
          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-hourglass-half"></i></td>
              <td>דד-ליין</td>
              <td>{test.deadline ? (new Date(test.deadline)).toLocaleDateString('en-GB') : "ללא דד-ליין"}</td>
              
          </tr>
          <tr className={Style.dropdown}>
                <td className={Style.center}><i className="fas fa-link"></i></td>
                <td>קישור</td>
                <td>
                  {
                      test.status.includes("Edited") || test.status.includes("Distributed") ?
                      <Link to={`/test-form/${test._id}`} className={`${color.current[test.status]}`}><i className="fas fa-pencil-alt"></i> לערוך</Link>
                      : 
                      <Link to={`/test-form/${test._id}`} className={`${color.current[test.status]}`}><i className="far fa-eye"></i> לצפייה</Link>
                  }
                </td>
              
          </tr>

          <tr className={Style.dropdown}>
              <td className={Style.center}><i className="fas fa-exclamation-triangle"></i></td>
              <td>מחיקת מבחן</td>
              <td className="pointer" onClick={() => setPopup(true)}><i className="fas fa-trash"></i> למחוק</td>
              
          </tr>
          <tr>
              <td></td>
          </tr>
          </>
      }
      {
          popup &&
          <Popup 
          title="מחיקת מבחן"
          icon="fas fa-exclamation-triangle"
          message={`פעולה זאת תמחק לצמיתות את  ${test.name || 'המבחן שלחצת עליו'} לא ניתן לבטל פעולה זאת`} 
          btnText="אוקיי, אני רוצה למחוק" 
          backText="אני רוצה לחזור אחורה!" 
          state={[popup, setPopup]} 
          func={deleteTest}
          info={test._id} 
          />
      }
      </div>
    )
}
