const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

// const lid = id;
const {
    lid,
    username,
    room
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

// const username = document.getElementById("nammee").innerHTML;
// const room = document.getElementById("rooomm").innerHTML;
socket.emit("joinRoom", {
    lid,
    username,
    room,
});

// console.log(username, room);
socket.on("message", function (message) {
    console.log(message);
    Outputmsg(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
socket.on("intro", function (intro) {

    begin(intro);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
socket.on("id", function (id) {
    console.log(id);

    idmd(id);
    // chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit("cmsg", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function idmd(id) {
    document.getElementById('name').innerHTML = "<i class='fas fa-user'></i>  " + id.username;
    const div = document.createElement("div");
    div.classList.add("id");

    div.innerHTML = `<div id="oooid" style="background:green;margin:8px;display:none;"><p id="check" class="meta">${id.lid}</p>`;

    // document.getElementById('oooid').style.display = 'none';
    document.querySelector(".chat-messa").appendChild(div);
}


function begin(intro) {

    const div = document.createElement("div");
    div.classList.add("intro");

    div.innerHTML = `<center><div style="color:#333;background:rgba(82, 178, 191,0.2);width:50%;padding:3px;margin:15px;"><b>${intro.username} </b> ${intro.text} </div></center>`;


    document.querySelector(".chat-messages").appendChild(div);
}

function Outputmsg(message) {
    var id = document.getElementById("check").innerHTML;
    const div = document.createElement("div");
    div.classList.add("message");
    // const cid = message.id;
    var x = message.lid;
    console.log(id);
    console.log(x);

    if (String(x) == String(id)) {
        console.log(x);
    }
    // s = s.substring(0, s.indexOf('='));
    if (String(x) == String(id)) {
        div.innerHTML = `<div class="col-lg-12 d-flex flex-row-reverse"><div class=" col-xs-5 talk-bubble triangle right-top "  style="background:rgba(172, 223, 135,1);padding:2px 5px 1px 5px;border-radius:5px;padding:5px;margin:8px;padding-left:8px;padding-right:8px;">
    <div class="talktext"><p class='text'style="padding:0;margin:0">${message.text}</p><span class="d-flex flex-row-reverse"style="font-size:12px;">${message.time}</span></div></div></div>`;
    } else {
        div.innerHTML = `<div class="col-lg-12 d-flex flex-row "><div class="col-xs-5 talk-bubble triangle left-top" style="background:#f5f5f5;border-radius:5px;padding:5px;margin:8px;padding-left:8px;padding-right:8px;"><p style="padding:0;margin:0;color:#52b2bf" >${message.username}</p>
  <div class="talktext">  <p class='text'style="padding:0;margin:0">${message.text}<span class="d-flex flex-row-reverse" style="font-size:12px;">${message.time}</span></p></div></div></div>`;
    }

    document.querySelector(".chat-messages").appendChild(div);
}