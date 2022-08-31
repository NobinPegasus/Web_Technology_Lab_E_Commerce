import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(async (req) => {
  // console.log({ BASE_URL });
  if (localStorage.getItem("jwtoken")) {
    let token = localStorage.getItem("jwtoken");
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export const SignupUser = async (data) => {
  const res = await API.post("/user/signup", data);
  return res;
};
export const SigninUser = async (data) => {
  const res = await API.post("/user/login", data);
  return res;
};
export const AllUsers = async () => {
  const res = await API.get("/user/allusers");
  return res;
};
export const SingleUserProfile = async (id) => {
  const res = await API.get(`/user/singleuser/${id}`);
  return res;
};
export const GetRole = async (id) => {
  const res = await API.get(`/user/getRole`);
  return res;
};
export const SetBankAccount = async (data) => {
  console.log(data);
  const res = await API.post(`/user/setBankAccount/`, data);
  return res; 
};

// product ..
export const AddNewProduct = async (data) => {
  const res = await API.post("/product/createproduct", data);
  return res;
};
export const GetAllProducts = async () => {
  const res = await API.get(`/product/allproduct`);
  return res;
};
export const DeleteProduct = async (id) => {
  const res = await API.delete(`/product/deleteproduct/${id}`);
  return res;
};

//  order here
export const AddNewOrder = async (data) => {
  const res = await API.post("/order/createorder", data);
  return res;
};

export const buyerOrder = async (id) => {
  const res = await API.get(`/order/singleorder/${id}`);
  return res;
};

export const DeleteUSerOrder = async (id) => {
  const res = await API.delete(`/order/deleteorder/${id}`);
  return res;
};
export const AllOrders = async () => {
  const res = await API.get(`/order/allorder`);
  return res;
};


// payment option...
export const PaymentOrder = async (id, data) => {
  const res = await API.post(`/payment/pay/${id}`, data);
  return res;
};

export const GetBalance = async (id, data) => {
  const res = await API.get(`/payment/balance`);
  return res;
};


