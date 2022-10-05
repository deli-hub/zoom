/*
WebSocket에서 사용
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

socket에서 object가 아닌 string으로 굳이 변환을 해서 보내주는 이유는
 * websocket이 브라우저에 있는 API이기 때문이다.
 * 백엔드에서는 다양한 프로그래밍 언어를 사용할 수 있기 때문에
 * API는 어떠한 판단도 해서는 안된다.

 const socket = new WebSocket(`ws://${window.location.host}`);

 function makeMessage(type, payload) {
     const msg = {type, payload}
     return JSON.stringify(msg);
 }
 
 socket.addEventListener("open", () => {
     console.log("Connected to Server ✅");
 });
 
 socket.addEventListener("message", (message) => {
     // console.log("Just got this: ", message, "from the server");
     // console.log("New Message: ", message.data);
     const li = document.createElement("li");
     li.innerText = message.data;
     messageList.append(li); 
 });
 
 socket.addEventListener("close", () => {
     console.log("Disconnected from Server ❌");
 });
 
 // 첫 번째 줄은 JSON 형태가 아니기 때문에 B/E로 가면 parse에서 에러 발생
 // setTimeout(() => {
 //     // socket.send("hello from the browser!");
 //    socket.send(makeMessage("test", "Hi, This is a test msg"));
 // }, 10000);
 
 
 function handleSubmit(event) {
     event.preventDefault();
     const input = messageForm.querySelector("input");
     // JSON으로 전송해서 별명/채팅메시지 구분 위함
     socket.send(makeMessage("new_message", input.value));
     // socket.send(input.value);
     // console.log(input.value);
     input.value = "";
 }
 
 function handleNickSubmit(event) {
     event.preventDefault();
     const input = nickForm.querySelector("input");
     // JSON으로 전송해서 닉네임에 해당하는 대화만 뽑기 위함
     socket.send(makeMessage("nickname", input.value));
     input.value = "";
     // socket.send({
     //     type: "nickname",
     //     payload: input.value,
     // });
 }
 
 messageForm.addEventListener("submit", handleSubmit);
 nickForm.addEventListener("submit", handleNickSubmit);
*/

const socket = io();

const welcom = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg){
    console.log(`The backend says: `, msg);   
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    /** 
     * socket.send() 해줄 필요 없이 원하는 이벤트를 넘겨주면 됨
     * Socket IO를 이용하면 Object도 argument로 넘길 수 있다.
     * 1st argu : event name (same with emit's function name)
     * 2nd argu : parameter
     * 3rd argu : callback function
     * */ 
    socket.emit("enter_room", { payload:input.value }, backendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
