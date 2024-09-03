import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function DecideNavBar({ children }) {

  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    setShowNavbar(location.pathname !== '/')
  }, [location])

  return (
    <>
      {showNavbar && children}
    </>
  )

}
export { DecideNavBar }