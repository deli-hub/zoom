import http from "http";
/* WebSocket은 socketIO와 호환되지 않는다.
socketIO는 websocket의 부가기능이 아님
import WebSocket from "ws";
*/
import SocketIO from "socket.io";
import express from "express";
import { Socket } from "dgram";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// 'public' 폴더를 사용자들이 볼 수 있도록 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http 서버 위에 ws 서버를 올려두었기 떄문에 둘 다 사용할 수 있다.
const httpServer = http.createServer(app);
//Socket.io
const wsServer = SocketIO(httpServer); 
// WebSocket
// const wss = new WebSocket.Server({ server });

// wss.on("connection", handleConnnection);

wsServer.on("connection", socket => {
    socket.on("enter_room", (msg, done)=> {
        console.log(msg);
        setTimeout(() => {
            /* 두번째 인자로 받은 done(); 함수를 실행시킨다.
                callback 함수 (이름은 상관 없음)
            */
            done("hello from the backend");
        }, 10000);
    });
});

function onSocketClose() {
    console.log("Disconnected from the Browser ❌")
}

function onSocketMessage(message) {
//    console.log(message.toString('utf8'));
   console.log(message);
}

/*
WebSocket 사용의 경우
const sockets = [];

wss.on("connection", (socket) => {
    // socket connted
    sockets.push(socket);
    socket["nickname"] = "anonymous";
    console.log("Connected to Browser ✅");
    // socket의 이벤트는 양방향이다. (브라우저가 종료되든 서버가 종료되든 서로 알 수 있음)
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => {
        const message = JSON.parse(msg.toString("utf8"));
        console.log(message);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break; 
            // case "test":
            //     sockets.forEach((aSocket) => aSocket.send(`${socket.test}: ${message.payload}`));
            //     break;
        }
        
    });
    // wss가 아닌 socket에 있는 메소드를 사용한다.
    // socket.send("hello!!!");
});
*/

httpServer.listen(3000, handleListen);

