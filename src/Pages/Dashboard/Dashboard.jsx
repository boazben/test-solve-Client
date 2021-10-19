import React from 'react'
import Style from './DasboardStyle.module.css'
import TestsTable from './TestsTable/TestsTable'
import AddBut from '../../Components/AddBut/AddBut'
import { useHistory } from 'react-router-dom'
import { serverReq } from '../../functions'

export default function Dashboard() {
    const history = useHistory()

    async function newTest() {
        try {
            // Creat new test:
            const test = await serverReq('put', '/create_test')
            // go to the test-form page with the id of the new test:
            history.push(`/test-form/${test._id}`)
        } catch (error) {
            console.log(error.response?.data?.error || error.message || error);
        }
    }
    return (
        <div>
            <button className={Style.but} onClick={newTest}>יצירת מבחן חדש</button>
            <TestsTable />
        </div>
    )
}
