import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Row from './Row/Row'
import './ExamineeTable.css'
import Style from './ExamineeTable.module.css'
import { ExamineesContext } from '../TestData'


export default function ExamineeTable() {
  const [examinees, setExaminees] = useContext(ExamineesContext)
  const table = useRef(null)
  const [tableState, setTableState] = useState([])
  const [sort, setSort] = useState({
    name: "null",
    downToUp: true
  })
  const [showInfo, setShowInfo] = useState(false)
  
  console.log(tableState);

  function sorted(columnName) {

      switch (columnName) {

        case "testName":
          sortedWithName("testName", "name")
          break;

        case "status":
          sortedWithName("status", "status_he")
          break;

        case "createdDate":
          sortedWithName("createdDate", "created")
          break;
          
        case "deadline":
          sortedWithName("deadline", "deadline")
          break;


      
        default:
          break;
      }

  }

  function sortedWithName(name, objName) {
    if(sort.name.includes(name)) {
      sort.downToUp ?
      setTableState(tableState.sort((a, b) => (a[objName] > b[objName]) ? -1 : ((b[objName] > a[objName]) ? 1 : 0)))
      : setTableState(tableState.sort((a, b) => (a[objName] > b[objName]) ? 1 : ((b[objName] > a[objName]) ? -1 : 0)))
      
      setSort({
        name: name,
        downToUp: !sort.downToUp
      })

    } else {
      setTableState(tableState.sort((a, b) => (a[objName] > b[objName]) ? 1 : ((b[objName] > a[objName]) ? -1 : 0)))
      setSort({
        name: name,
        downToUp: true
      })

    }
  }

  

  return (
    <>
        <table ref={table} className={`table ${Style.table}`}>
        <tbody>
        <tr>
          <th className="mobile"></th>

          {/* Image */}
          <th>תמונה</th>

            {/* Name */}
          <th onClick={() => sorted("status")}>
            שם
            {/* <span>
            {
            sort.name.includes("status") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span> */}
          </th>


            {/* Email */}
          <th className="webTable" onClick={() => sorted("createdDate")}>
            אימייל
            {/* <span>
            {
            sort.name.includes("createdDate") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span> */}
          </th>


            {/* Status */}
          <th className="webTable" onClick={() => sorted("deadline")}>
            סטטוס
            {/* <span>
            {
            sort.name.includes("deadline") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span> */}
          </th>


        </tr>
        {examinees.map(examinee => {
          return <Row key={examinee._id} examinee={examinee}/>
        })}
       </tbody>
      </table>
    </>
  )
}