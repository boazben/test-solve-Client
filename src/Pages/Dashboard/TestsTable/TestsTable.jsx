import React, { createContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken, serverReq } from '../../../functions'
import Row from './Row/Row'
import TestName from './TestName/TestName'
import './TestsTableStyle.css'

export const DeleteTest = createContext()

export default function TestsTable() {
  const table = useRef(null)
  const [tableState, setTableState] = useState([])
  const [showInfo, setShowInfo] = useState(false)
  const [sort, setSort] = useState({
    name: "null",
    downToUp: true
  })
  
 

  console.log(tableState);

  useEffect(() => {
    getTestes()
  }, [])

  async function deleteTest(_id) {
    try {
      const test = await serverReq('put', '/edit_test', {"idTest": _id, "newData": {"active": false}})
      getTestes()
    } catch (error) {
      console.log(error.response?.data?.error || error.message || error);
    }
  }
  
  async function getTestes() {
    try {
      const res = await serverReq('post', '/my_created')
      const tests = res
      setTableState(tests)
    } catch (error) {
      console.log(error.response?.data?.error || error.message || error);
    }
  }

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
        <table ref={table}>
        <tbody>
        <tr>
          <th className="mobile"></th>

          {/* Name */}
          <th onClick={() => sorted("testName")}>
          שם מבחן
          <span>
            {
            sort.name.includes("testName") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
          </span>
          </th>

            {/* Status */}
          <th onClick={() => sorted("status")}>
            סטטוס
            <span>
            {
            sort.name.includes("status") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span>
          </th>


            {/* Created Date */}
          <th className="webTable" onClick={() => sorted("createdDate")}>
            תאריך יצירה
            <span>
            {
            sort.name.includes("createdDate") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span>
          </th>


            {/* Deadline */}
          <th className="webTable" onClick={() => sorted("deadline")}>
            דד-ליין
            <span>
            {
            sort.name.includes("deadline") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span>
          </th>

            {/* Link */}
          <th className="webTable" onClick={() => sorted("link")}>
            קישור
            <span>
            {
            sort.name.includes("link") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span>
          </th>

            {/* Delete */}
          <th className="webTable" onClick={() => sorted("delete")}>
            מחיקה
            <span>
            {
            sort.name.includes("delete") ? sort.downToUp ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i> : null
            } 
            </span>
          </th>



        </tr>
        <DeleteTest.Provider value={deleteTest}>
        {tableState.map((test, index) => {
          return <Row key={index} test={test}/>
        })}
        </DeleteTest.Provider >
       </tbody>
      </table>
    </>
  )
}