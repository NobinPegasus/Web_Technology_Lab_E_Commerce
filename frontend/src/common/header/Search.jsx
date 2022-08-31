import React from "react"
import { Link } from "react-router-dom"

const Search = ({ CartItem }) => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("jwtoken");
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
              alt=""
              style={{ height: "45px", width: "45px" }}
            />
            <span>E-Commerce</span>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span>All Category</span>
          </div>

          <div className="icon f_flex width">
            <i className="fa fa-user icon-circle"></i>
            {!role && !token ? (
              ""
            ) : (
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Search
