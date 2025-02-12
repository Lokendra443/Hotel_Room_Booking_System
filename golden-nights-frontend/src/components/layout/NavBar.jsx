import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/AuthProvider'

const NavBar = () => {

    const [showAccount, setShowAccount] = useState(false)

    const {user} = useContext(AuthContext)

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    const isLoggedIn = user !== null
    const userRole = localStorage.getItem("userRole")

 

  return (
    // <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
    //     <div>
    //         <Link to={"/"}>
    //             <span className='hotel-color'>golden night</span>
    //         </Link>

    //         <button
    //         className='navbar-toggler'
    //         type='button'
    //         data-bs-toggle='collapse'
    //         data-bs-target='#navbarScroll'
    //         aria-controls='navbarScroll'
    //         aria-expanded='false'
    //         aria-label='Toggle navigation'
    //         >
    //             <span className='navbar-toggler-icon'></span>

    //         </button>

    //         <div className='collapse navbar-collapse' id='navbarScrooll'>
    //             <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
    //                 <li className='nav-item'>
    //                     <NavLink className='nav-link' aria-current="page" to={"/browse-all-rooms"}>
    //                         Browse all rooms
    //                     </NavLink>
    //                 </li>

    //                 <li className='nav-item'>
    //                     <NavLink className='nav-link' aria-current="page" to={"/admin"}>
    //                         Admin
    //                     </NavLink>
    //                 </li>
    //             </ul>


    //             <ul className='d-flex navbar-nav'>
    //                 <li className='nav-item'>
    //                     <NavLink className='nav-link' aria-current="page" to={"/find-booking"}>
    //                         Find My Booking
    //                     </NavLink>
    //                 </li>

    //                 <li className='nav-item dropdown'>
    //                     <a 
    //                     className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
    //                     href='#'
    //                     role='button'
    //                     data-bs-toggle='dropdown'
    //                     aria-expanded="false"
    //                     onClick={handleAccountClick}
    //                     >
    //                         {" "}

    //                         Account
    //                     </a>

    //                     <ul>
    //                         <li>
    //                             <Link to={"/login"} className='dropdown-item'>Login</Link>
    //                         </li>

    //                         <li>
    //                             <Link to={"/profile"} className='dropdown-item'>Profile</Link>
    //                         </li>

    //                         <li>
    //                             <Link to={"/logout"} className='dropdown-item'>Logout</Link>
    //                         </li>

    //                     </ul>
                    
    //                 </li>



    //             </ul>

    //         </div>

    //     </div>

      
    // </nav>

    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-2 sticky-top'>
      <div className='container-fluid'>
        <Link to="/" className='navbar-brand'>
          <span className='hotel-color'>Golden Night</span>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarScroll'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to="/browse-all-rooms">
                Browse all rooms
              </NavLink>
            </li>

            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className='nav-item'>
              <NavLink className='nav-link' to="/admin">
                Admin
              </NavLink>
            </li>

            ) }
            


          </ul>

          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to="/find-booking">
                Find My Booking
              </NavLink>
            </li>
            
            <li className='nav-item dropdown'>
              <a
                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                role="button"
                data-bs-toggle="dropdown"
                onClick={() => setShowAccount(!showAccount)}
              >
                Account
              </a>
              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
              aria-labelledby='navbarDropdown'
              >
                {isLoggedIn ? (
                  <li>
                  <Logout/>
                </li>

                ): (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>

                )}
                
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li>
                  <hr className='dropdown-divider'/>
                </li>
                
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  )
}

export default NavBar
