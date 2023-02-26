const express = require("express");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/route");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin:["http://localhost:3001", "https://stockScreenerMern.onrender.com"]
}));
app.use("/", feedRoutes);
mongoose.connect("mongodb+srv://titdor:simpdor123@cluster0.l1fktor.mongodb.net/?retryWrites=true&w=majority");
app.listen(3001);