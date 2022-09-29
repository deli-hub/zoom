import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// 'public' 폴더를 사용자들이 볼 수 있도록 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http 서버 위에 ws 서버를 올려두었기 떄문에 둘 다 사용할 수 있다.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// function handleConnnection(socket) {
//     console.log(socket);
// }

// wss.on("connection", handleConnnection);

wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    // socket의 이벤트는 양방향이다. (브라우저가 종료되든 서버가 종료되든 서로 알 수 있음)
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (message) => {
        console.log(message.toString('utf8'));
    });
    // wss가 아닌 socket에 있는 메소드를 사용한다.
    socket.send("hello!!!");
});

server.listen(3000, handleListen);

