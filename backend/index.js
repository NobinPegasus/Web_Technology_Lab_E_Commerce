const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const DatabaseConncetion = require("./DatabaseConncetion");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const payment = require("./routes/payment");

dotenv.config();
DatabaseConncetion();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello web.");
});
// all routes here...
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", payment);

//Server is listening here...
app.listen(4000, () => {
  console.log("Server is listening at port - 4000");
});
