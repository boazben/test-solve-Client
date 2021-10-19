import React, { useEffect, useState } from 'react'
import Style from './TestLinkShowStyle.module.css'

export default function TestLinkShow({test}) {
    const [deadline, setDeadline] = useState("מחשב..")
    useEffect(()=> {

        function getDeadline() {
            let res
            if (test.test.deadline) {
                const time = test.test.deadline - new Date().getTime()
                
                const days = time / (1000 * 60 * 60 * 24)
                if (days < 1 & days > 0) {
                    const hours = days * 24
                    res = `נשארו ${hours.toFixed(1)} שעות להגשת המבחן `
                }
                else if (days <= 0) res = "המבחן סגור. עבר הדד-ליין."
                else res = `נשארו ${days.toFixed(1)} ימים להגשת המבחן`
             } 
             else res = "ללא דד-ליין"
            setDeadline(res)
        }
        getDeadline()
    }, [])
    
    return (
        <div className={Style.testContainer}>
            <h4 className={Style.name}>{test.test.name || "מבחן ללא שם"}</h4>
            <h4>זמן: {Math.round(test.test.timeForTest / (1000 *60 * 60)) } שעות</h4>
            <h4>מי הבוחן:</h4>
            <div className={Style.TesterImg} style={{ backgroundImage: `url(${test.test.creator.profilePicture || 'https://hook.finance/sites/default/files/user.png'})` }}></div>
            <h4>{`${test.test.creator.name.first} ${test.test.creator.name.last}`}</h4>
            <h4 className={Style.deadline}>{deadline}</h4>
        </div>
    )
}
