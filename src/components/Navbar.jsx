import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router'


const Navbar = () => {

  const links = [
    {
      link: "Home",
      path: "/home"
    },
    {
      link: "Pets and Supplies",
      path: '/pets-and-supplies'
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

  return (
    <>
      <div className="navbar bg-white shadow-sm px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="black" viewBox="0 0 24 24" stroke="black"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
              <div className='flex justify-center items-center flex-row gap-8' >
                {
                  links.map(({ link, path }, index) => (
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
                links.map(({ link, path }, index) => (
                  <span key={index} className='text-[#7351d4] text-lg' ><Link to={path} >{link}</Link></span>
                ))
              }
            </div>
          </ul>
        </div>
        <div className="navbar-end">
          <div className='flex justify-center items-center gap-5 ' >
            {
              buttons.map(({ title, path }, index) => (
                <Link key={index} to={path}><button className='bg-orange-600 px-5 py-2 rounded-lg cursor-pointer text-lg' >{title}</button></Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

