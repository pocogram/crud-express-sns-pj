const express = require("express");
const Socket = require("socket.io");
const session = require("express-session");
const app = express();
const PORT = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);
const multer = require("multer");
const path = require("path");
const upload = multer({
  dest: "uploads/",
});
const moment = require("moment");

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/common", express.static(__dirname + "/common"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/pages", express.static(__dirname + "/pages"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use("/user", userRouter);
app.use("/", postRouter); // 메인이 post 컨트롤러 사용

app.get("/", (req, res) => {
  res.render("pages/main");
});

app.get("/upload", (req, res) => {
  return res.render("pages/upload");
});

app.get("/signin", (req, res) => {
  res.render("pages/signin");
});

app.get("/signup", (req, res) => {
  res.render("pages/signup");
});

app.get("/mypage", (req, res) => {
  res.render("pages/mypage");
});

app.get("/mypageEdit", (req, res) => {
  res.render("pages/mypageEdit");
});

app.get("/profile_edit", (req, res) => {
  res.render("pages/profile_edit");
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
