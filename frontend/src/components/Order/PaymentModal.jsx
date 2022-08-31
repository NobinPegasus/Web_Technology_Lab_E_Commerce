import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { PaymentOrder } from "../../Api/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #e94560",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

export default function PaymentModal({
  openModal,
  setOpenModal,
  orderid,
  getOrder,
}) {
  const [pay, setPay] = useState({
    from: "",
    to: "",
    amount: 0,
  });
  const handleClose = () => {
    setOpenModal(false);
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setPay({
      ...pay,
      [name]: value,
    });
  };
  const payment = async () => {
    const res = await PaymentOrder(orderid, pay);
    if (res.status === 200) {
      alert("Payment successful.");
      getOrder();
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="User acoount"
            name="from"
            value={pay.from}
            onChange={onValueChange}
            sx={{ marginTop: ".5rem" }}
          />
          <TextField
            label="Supplier Account"
            name="to"
            value={pay.to}
            onChange={onValueChange}
            sx={{ marginTop: ".5rem" }}
          />
          <TextField
            label="Amount"
            name="amount"
            value={pay.amount}
            onChange={onValueChange}
            sx={{ marginTop: ".5rem" }}
          />

          <Button
            onClick={() => {
              payment();
              handleClose();
            }}
            variant="contained"
            sx={{ bgcolor: "#e94560", color: "white", marginTop: "1rem" }}
          >
            Pay now
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
