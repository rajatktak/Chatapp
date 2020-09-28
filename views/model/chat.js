const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const chatSchema = new mongoose.Schema({
    id: {
        type: String
    },
    sendname: {
        type: String
    },
    msg: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("chat", chatSchema);
// module.exports = chat;