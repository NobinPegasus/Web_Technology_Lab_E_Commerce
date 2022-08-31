import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory()
  const [MobileMenu, setMobileMenu] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("jwtoken")
  console.log(role)

  const logout = () =>{
    console.log("logout")
    localStorage.removeItem("jwtoken")
    localStorage.removeItem("role")
        localStorage.removeItem("id");
    history.push("/login")
    window.location.reload();
  }

  

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">Products</Link>
              </li>
              {role === "seller" && (
                <li>
                  <Link to="/addproduct">Add products</Link>
                </li>
              )}
              <li>
                <Link to="/order">Orders</Link>
              </li>
              {token ? (
                <>
                  <li>
                    <span onClick={logout} className="logout">
                      Logout
                    </span>
                  </li>
                  <li>
                    <Link to="/user" className="logout">
                      User
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
