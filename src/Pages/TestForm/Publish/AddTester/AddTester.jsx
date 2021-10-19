import React, { useContext } from 'react'
import { serverReq } from '../../../../functions'
import { TestFormContext } from '../../TestForm'
import { ErrorContext, RerenderContext, TestersContext } from '../Publish'
import './AddTester.css'

export default function AddTester() {
    
    const [errorMessage, setErrorMessage] = useContext(ErrorContext)
    const [test, setTest]  = useContext(TestFormContext)
    const [testers, setTesters] = useContext(TestersContext)
    async function add(e) {
        e.preventDefault()
        const values = Object.values(e.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
        const {email} = values
        e.target.reset()
        
        // TODO- massage to user that the test going to publish
        try {
            const newExaminee = await serverReq('put', '/create_examinee_invitation', {"idTest": test._id, "email": email})
            const upDateTesters = await serverReq('post', '/get_testers', {"id": test._id})
            setTesters(upDateTesters)
            setErrorMessage("")

        } catch (error) {
            console.log(`In TensName page, error: ${error.response?.data?.error || error.message || error}`)
            setErrorMessage(error.response?.data?.error || error.message || error)
        }
    }

    return (
        <form onSubmit={e => add(e)}>
            <div className="addTesterContainer" >
                <input type="submit" value="+" className="addTesterSubmit"/>
                <input name="email" type="email" placeholder="email@email.com" className="addTesterInput" />
            </div>
            <label htmlFor="email" >הוסף נבחן</label>
        </form>
    )
}
