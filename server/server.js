const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const placeRoutes = require("./routes/places");
const bookingRoutes = require("./routes/bookings");

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/bookings", bookingRoutes);

// app.get("/test", (req, res) => {
//   res.json("test ok");
// });

app.post("/api/add-photo-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const upload = multer({ dest: "uploads/" });
app.post(
  "/api/add-photo-by-upload",
  upload.array("photos", 100),
  (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  }
);

const PORT = 4005;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} is not connected`));
