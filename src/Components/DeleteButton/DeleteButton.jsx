import React, { useContext } from 'react'
import { TestFormContext } from '../../Pages/TestForm/TestForm'
import './DeleteButton.css'

export default function DeleteButton({toDelete}) {

    
    return (
        <div className="deleteButCon" onClick={toDelete}>
            <i className="fas fa-trash"></i>
        </div>
    )
}
