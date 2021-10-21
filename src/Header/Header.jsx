import React, { useContext, useLayoutEffect, useState } from 'react'
import { WidthScreen } from '../App/App'
import MobileHeader from './MobileHeader/MobileHeader'
import WebHeader from './WebHeader/WebHeader'

export default function Header() {
    const [width, setWidth] = useContext(WidthScreen)
    // const [width, setWith] = useState(window.innerWidth);
  
    // useLayoutEffect(() => {
    //     function updateWith() {
    //         setWith(window.innerWidth);
    //     }
    //     window.addEventListener('resize', updateWith);
    //     updateWith();
    //     return () => window.removeEventListener('resize', updateWith);
    // }, []);

    return (
        <>
        {
            width < 769 ? 
            <MobileHeader />
            : <WebHeader />
        }
        </>
    )
}
