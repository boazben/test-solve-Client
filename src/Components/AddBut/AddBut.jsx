import React from 'react'
import './AddBut.css'

export default function AddBut({toAdd}) {
    return (
        <button className="butContainer" onClick={toAdd}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
