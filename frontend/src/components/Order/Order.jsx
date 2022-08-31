import React, { useEffect, useState } from "react";
import { buyerOrder, DeleteUSerOrder, AllOrders } from "../../Api/Api";
import { useHistory } from "react-router-dom";
import "./Order.css";
import PaymentModal from "./PaymentModal";

const Order = () => {
  const [orderid, setOrderId] = useState()
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const deleteOrder = async (id) => {
    await DeleteUSerOrder(id);
    getOrder();
  };
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const getOrder = async () => {
    if (role === "buyer") {
      const res = await buyerOrder(id);
      setOrders(res.data);
    } else {
      const res = await AllOrders();
      setOrders(res.data);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <div className="order_div">
        {orders.map((order, i) => (
          <div key={i} className="order_element">
            <h3 style={{ color: "#2B4865" }}>
              Product quantity :
              <span style={{ color: "gray", marginLeft: "1rem" }}>
                {order.products.length}
              </span>
            </h3>
            <h3 style={{ color: "#2B4865" }}>
              Product price :
              <span style={{ color: "gray", marginLeft: "1rem" }}>
                ${order.amount}
              </span>
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ color: "#2B4865" }}>
                Status :
                <span style={{ color: "#FF1E00", marginLeft: "1rem" }}>
                  {order.status}
                </span>
              </h3>
              <div>
                <button
                  onClick={() => {
                    role === "seller" && deleteOrder(order._id);
                  }}
                  className="order_delete_btn"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button
                  onClick={() => {
                    setOpenModal(!openModal);
                    setOrderId(order._id);
                  }}
                  className="order_btn"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        ))}
        <PaymentModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          orderid={orderid}
          getOrder={getOrder}
        />
      </div>
    </>
  );
};

export default Order;
