require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const believerRoutes = require("./Routes/believerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/believers", believerRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
