import React from 'react';
import Container from 'react-bootstrap/Container';
import { NavLink, Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const [auth, setAuth] = useAuth()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth")
    toast.success("logout successfully")
  }
  return (
    <>
      <Navbar bg="light" expand="lg" className='navbar'>
        <Container fluid>
          <Link to="/" className="navbar-brand"><GiShoppingBag />Ecommerce</Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 "
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/catagory" className="nav-link">Catagory</NavLink>
              </li>
              {
                !auth.user ? (
                  <>
                    <li className='nav-item'>
                      <NavLink to='/register' className="nav-link">Register</NavLink>
                    </li>

                    <li className='nav-item'>
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>

                  </>) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" href="#"  role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ border: "none" }}>
                       {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink to={`/dashboard/${auth?.user?.role===1 ? "admin":"user"}`} className="dropdown-item">Dashboard</NavLink></li>
                        <li >
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                    </li>
                      </ul>                   
                       </li>
                   
                  </>
                )
              }
              <li className='nav-item'>
                <NavLink to="/cart" className="nav-link">cart(0)</NavLink>
              </li>



            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  );
};

export default Header;