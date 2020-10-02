const socket = io();

const textarea = document.querySelector("#textarea");
const messageArea = document.querySelector(".message-area");
let name;
do {
  name = prompt("enter your name");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //send to server
  socket.emit("message", msg);
}
function appendMessage(msg, type) {
  let Div = document.createElement("div");
  let className = type;
  Div.classList.add(className, "message");

  let markup = `
       <h4>${msg.user}</h4>
       <p> ${msg.message}</p>

    `;
  Div.innerHTML = markup;
  messageArea.appendChild(Div);
}
//receive from server

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");

  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
