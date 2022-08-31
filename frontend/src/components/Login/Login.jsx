import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { SigninUser } from "../../Api/Api";

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
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
  const userLogin = async () => {
    const res = await SigninUser(user);
    const { token, existUser } = res.data;
    localStorage.setItem("jwtoken", token);
    localStorage.setItem("role", existUser.role);
    localStorage.setItem("id", existUser._id);
    if (res.status === 200) {
      history.push("/");
      window.location.reload();
    } else {
      alert("Invalid credentials.");
    }
  };
  return (
    <>
      <div className="login_div">
        <div className="login_img">
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
        <button onClick={userLogin} className="login_button">
          Login{" "}
        </button>
      </div>
    </>
  );
};

export default Login;
