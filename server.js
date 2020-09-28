const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const formatmsg = require("./views/message");
const emoji = require("./views/model/emoji");
const chat = require("./views/model/chat");
const idd = require("./views/model/id");

const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const url = "mongodb://localhost:27017/chat";
const connect = mongoose.connect(url, {
    useNewUrlParser: true
});
const botname = "chatt";
const {
    userjoin,
    getcurrentuser,
    userleave,
    getroomuser
} = require("./views/user");

mongoose.connect("mongodb://localhost/Chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "views")));
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.get('/', function (req, res) {
    res.render("index");
})
app.post("/chat", async function (req, res) {


    const ids = await idd.findOne({
        id: req.body.id,
    });
    if (!ids) {
        res.send("<center><h1 style='color:red;margin:20px;'>Username not found</h1></center>");
        res.redirect("/");
    }
    if (ids.pass == req.body.pass) {
        var id = req.body.id;
        var name = req.body.username;
        var room = req.body.room;

        res.render('middle', {
            id: id,
            name: name,
            room: room

        });
    } else res.send("<center><h1 style='color:red;margin:20px;'>pasword is invalid</h1></center>");




})
app.get('/welcome', async function (req, res) {

    var id = req.query.id;
    var name = req.query.username;
    var room = req.query.room;
    const emo = await emoji.find();
    const ch = await chat.find();

    res.render('chat', {
        id: id,
        name: name,
        room: room,
        emo: emo,
        ch: ch
    });
})

io.on("connection", (socket) => {
    socket.on("joinRoom", ({
        lid,
        username,
        room
    }) => {
        const user = userjoin(lid, username, room);
        socket.join(user.room);

        console.log("new connection...");
        // console.log(user.lid);
        socket.id = user.lid;
        user.lid = lid;
        socket.emit("id", formatmsg(user.lid, user.username, "Welcome to chatt"));
        // socket.emit("intro", formatmsg(user.id, botname, "Welcome to chatt"));

        socket.broadcast.to(user.room).emit("intro", formatmsg(user.lid, `${user.username}`, ` has joined`));

    });

    socket.on("cmsg", function (msg) {
        // console.log(msg);
        const user = getcurrentuser(socket.id);
        console.log(user.room);
        user.id = socket.id;
        io.to(user.room).emit("message", formatmsg(user.id, user.username, msg));
        // console.log(user.id);

        connect.then(db => {
            console.log("connected correctly to the server");

            let chatMessage = new chat({
                id: user.id,
                sendname: user.username,
                msg: msg
            });
            chatMessage.save();
        });
    });

    socket.on("disconnect", function () {
        const user = userleave(socket.id);
        if (user) {
            io.to(user.room).emit("intro", formatmsg(user.id, `${user.username}`, ` has left`));
        }
    });
});

const PORT = 5000 || process.env.PORT;
server.listen(PORT, function () {
    console.log(`Server Running on PORT ${PORT}`);
});