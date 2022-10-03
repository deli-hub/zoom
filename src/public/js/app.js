const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
/**socket에서 object가 아닌 string으로 굳이 변환을 해서 보내주는 이유는
 * websocket이 브라우저에 있는 API이기 때문이다.
 * 백엔드에서는 다양한 프로그래밍 언어를 사용할 수 있기 때문에
 * API는 어떠한 판단도 해서는 안된다.
 */
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