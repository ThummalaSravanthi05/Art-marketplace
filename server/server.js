const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
mongoose.connect("mongodb+srv://ramathummala1234_db_user:bpikUnJxXHc5vbWY@cluster0.obypqng.mongodb.net/?appName=Cluster0")
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.get("/", (req, res) => {
    res.send("Art Marketplace API Running 🚀");
});