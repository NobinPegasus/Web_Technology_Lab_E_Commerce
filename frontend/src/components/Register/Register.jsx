import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import {SignupUser} from "../../Api/Api";


const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const userRegister = async() => {
    console.log(user);
    const res = await SignupUser(user);
    if(res.status === 200 ){
      history.push("/login")
    }else{
      alert("Please full fill the conditions")
    }
  };
  return (
    <>
      <div className="reg_div">
        <div className="reg_img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
            alt=""
            style={{ height: "60px", width: "60px", marginTop: "2rem" }}
          />
          <span
            style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "2rem" }}
          >
            Login your account
          </span>
        </div>
        <input
          type="text"
          placeholder="username"
          className="login_input"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="login_input"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="login_input"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <select onChange={handleChange} name="role" id="role" className="user_role">
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
        <button onClick={userRegister} className="reg_button">
          Signup
        </button>
      </div>
    </>
  );
};

export default Register;
