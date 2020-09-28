const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const idSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true

    }
});

module.exports = mongoose.model("id", idSchema);
// module.exports = chat;