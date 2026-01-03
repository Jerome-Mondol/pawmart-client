import React from 'react'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router'

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
          <Link to="/pets-and-supplies" className="link link-hover">Adopt</Link>
          <Link to="/category-filtered-product/pet-food" className="link link-hover">Pet Foods</Link>
          <Link to="/category-filtered-product/pet-care" className="link link-hover">Pet Care Products</Link>
          <Link to="/category-filtered-product/accessories" className="link link-hover">Pet Accessories</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/about" className="link link-hover">About us</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
          <Link to="/pets-and-supplies" className="link link-hover">Pet kit</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms" className="link link-hover">Terms of use</Link>
          <Link to="/terms" className="link link-hover">Privacy policy</Link>
          <Link to="/terms" className="link link-hover">Cookie policy</Link>
        </nav>
      </footer>
    </>
  )
}

export default Footer
