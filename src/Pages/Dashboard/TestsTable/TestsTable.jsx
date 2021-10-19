import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken, serverReq } from '../../../functions'
import TestName from './TestName/TestName'
import './TestsTableStyle.css'

export default function TestsTable() {
  let counter = 0
  const [tableState, setTableState] = useState([])

  useEffect(() => {
    getTestes()
  }, [])
  
  async function getTestes() {
    try {
      const res = await serverReq('post', '/my_created')
      const tests = res
      setTableState(tests)
    } catch (error) {
      console.log(error.response?.data?.error || error.message || error);
    }
  }

  async function deleteTest(_id) {
    try {
      const test = await serverReq('put', '/edit_test', {"idTest": _id, "newData": {"active": false}})
      getTestes()
    } catch (error) {
      console.log(error.response?.data?.error || error.message || error);
    }
  }

  return (
    <div>
        <table>
        <tbody>
        <tr>
          <th style={{width: '2px'}}>מספר מבחן</th>
          <th>שם מבחן</th>
          <th>סטטוס</th>
          <th>סוג</th>
          <th>תאריך יצירה</th>
          <th style={{width: '100px'}}>קישור</th>
          <th style={{width: '100px'}}>מחק</th>
        </tr>
        {tableState.map(({name, status_he, created, typeForm_he, _id}) => {
          counter++
          return (
            <tr key={_id}>
              <td key={_id + 'num'}>{counter}.</td>
              <td key={_id + 'name'}><TestName testId={ _id} key={_id}/></td>
              <td key={_id + 'status'}>{status_he}</td>
              <td key={_id + 'typeForm'}>{typeForm_he}</td>
              <td key={_id + 'created'}>{new Date(created).toLocaleDateString('en-GB')}</td>
              <td key={_id + 'created' + '1'}><Link className='Link' to={`/test-form/${_id}`}><i className="fas fa-pencil-alt"></i><span className="textLink">עריכה</span></Link></td>
              <td key={_id + 'delete'}><div className='deleteTestCont'><i className="fas fa-trash deleteTest" onClick={() => deleteTest(_id)}></i></div></td>
            </tr>
          )
        })}
       
       </tbody>
      </table>
    </div>
  )
}
//{name || 'ללא שם'}