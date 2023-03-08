require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

// connect database
const URI = process.env.MONGODB_URL;
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(URI);
        console.log("Mongo connected");
    } catch (error) {
        console.log("Mongo fail");
        process.exit();
    }
};
connectDB();

// Router
app.use("/user", require("./routers/userRouter"));
app.use("/api", require("./routers/categoryRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
