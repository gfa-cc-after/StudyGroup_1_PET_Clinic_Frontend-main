import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function DecideNavBar({children}) { //children taken from main routing

    const { pathname } = useLocation();      // get the current location
    const [showNavbar, setShowNavbar] = useState(false) // set the navbar to false by default

    useEffect(() => {   
        if (pathname === '/') {        // if the location is the landing page, hide the navbar
            setShowNavbar(false)
        }
        else {
            setShowNavbar(true)
        }
    }, [location])

    return (            // return the children with or without navbar component
        <>
            {showNavbar && children}    
        </>
    )

} export default DecideNavBar