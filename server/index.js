const express = require("express");
const dbConnect = require("./dbConnect");
const authRoutes = require("./routes/authRoutes");
const privateRoutes = require("./routes/privateRoutes");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config('./.env');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "100mb" }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.get("/", (req, res)=>{
    res.send("HI From Server! ");
})

app.use(cookieParser());
app.use("/auth", authRoutes);
app.use('/home', privateRoutes);

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is listning at ${PORT}`);
})