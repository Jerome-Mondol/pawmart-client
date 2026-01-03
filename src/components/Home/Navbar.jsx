import React, { useEffect, useRef } from 'react'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router'
import { useAuth } from '../../hooks/useAuth'


const Navbar = () => {
  const navRef = useRef(null);
  useEffect(() => {
    const setHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty('--navbar-height', `${navRef.current.offsetHeight}px`);
      }
    }
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  const publicLinks = [
    {
      link: "Home",
      path: "/"
    },
    
    {
      link: "Pets and Supplies",
      path: '/pets-and-supplies'
    }
  ]
  const privateLinks = [
    {
      link: "Home",
      path: "/"
    },
    {
      link: "Pets and Supplies",
      path: '/pets-and-supplies'
    },
    {
      link: "Add listing",
      path: '/add-listing'
    },
    {
      link: "My listing",
      path: '/my-listing'
    },
    {
      link: "My orders",
      path: '/my-orders'
    }
  ]
  const buttons = [
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Register",
      path: "/register",
    }
  ]

  const { user, emailPasswordSignOut, loading } = useAuth();

  const handleSignOut = async (e) => {
    e.preventDefault();
    await emailPasswordSignOut();
    localStorage.removeItem('token');
  }


  return (
    <>
      
        <div ref={navRef} className="navbar bg-white shadow-sm px-4 fixed top-0 left-0 right-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="black" viewBox="0 0 24 24" stroke="black"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-auto p-2 shadow">
              <div className='flex justify-center items-center flex-row gap-8' >
                {
                  user ?
                    privateLinks.map(({ link, path }, index) => (
                      <span key={index} className='text-[#7351d4]' ><Link to={path} >{link}</Link></span>
                    ))
                    :
                    publicLinks.map(({ link, path }, index) => (
                      <span key={index} className='text-[#7351d4]' ><Link to={path} >{link}</Link></span>
                    ))
                }
              </div>
            </ul>
          </div>
          <img src={Logo} alt="pawmart" className='h-30' />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <div className='flex justify-center items-center flex-row gap-8' >
              {
                user ?
                  privateLinks.map(({ link, path }, index) => (
                    <span key={index} className='text-[#7351d4]' ><Link to={path} >{link}</Link></span>
                  ))
                  :
                  publicLinks.map(({ link, path }, index) => (
                    <span key={index} className='text-[#7351d4]' ><Link to={path} >{link}</Link></span>
                  ))
              }
            </div>
          </ul>
        </div>
        <div className="navbar-end">
          <div className='flex justify-center items-center gap-5 ' >
            {
              !user ? (
                buttons.map(({ title, path }, index) => (
                  <Link key={index} to={path}>
                    <button className="bg-orange-600 px-5 py-2 rounded-lg cursor-pointer text-lg">
                      {title}
                    </button>
                  </Link>
                ))
              ) : (
                <div className="flex items-center gap-2">
                  <Link to={'/profile'} ><img src={user?.photoURL} alt="Profile" className="rounded-full h-15 w-15" /></Link>
                  <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer">Log out</button>
                </div>
              )
            }

          </div>
        </div>
      </div>
      
    </>
  )
}

export default Navbar

