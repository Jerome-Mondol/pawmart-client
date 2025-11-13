import React from 'react'
import Logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <img src={Logo} alt="Pawmart" className='h-30' />
          <p>
            PawMart connects local pet owners and buyers for adoption and pet
            care products. © 2025
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Adopt</a>
          <a className="link link-hover">Pet Foods</a>
          <a className="link link-hover">Pet Care Products</a>
          <a className="link link-hover">Pet Accessories</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Pet kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  )
}

export default Footer
