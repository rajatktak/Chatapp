const users = [];

function userjoin(lid, username, room) {
    const user = {
        lid,
        username,
        room
    };

    users.push(user);
    return user;
}

function getcurrentuser(lid) {
    return users.find(user => user.lid === lid);
};



function userleave(id, room) {
    const index = users.findIndex(user => user.id === id);
    const index1 = users.findIndex(user => user.room === room);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    if (index1 !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getroomuser(room) {
    return user.filter(user => user.room === room);
}

module.exports = {
    userjoin,
    getcurrentuser,
    userleave,
    getroomuser
};