import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// 'public' 폴더를 사용자들이 볼 수 있도록 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);