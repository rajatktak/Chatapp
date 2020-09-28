const moment = require('moment');

function formatmsg(lid, username, text) {
    return {
        lid,
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatmsg;