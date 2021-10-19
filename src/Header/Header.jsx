import React, { useLayoutEffect, useState } from 'react'
import MobileHeader from './MobileHeader/MobileHeader'
import WebHeader from './WebHeader/WebHeader'

export default function Header() {
    const [width, setWith] = useState(window.innerWidth);
  
    useLayoutEffect(() => {
        function updateWith() {
            setWith(window.innerWidth);
        }
        window.addEventListener('resize', updateWith);
        updateWith();
        return () => window.removeEventListener('resize', updateWith);
    }, []);

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
