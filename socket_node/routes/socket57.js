let exress = require("express");
let router = exress.Router();
let webSocket = require('ws');


// 客户端数量
let clientCount = 0;

let wss = new webSocket.Server({ port: 5777 });


wss.on('connection', function connection(ws) {
    console.log("server receive connection.")

    clientCount++;
    console.log(clientCount)
    // 进入聊天的人的信息
    ws.nickName = "user" + clientCount

    wss.clients.forEach(function each(client) {
        client.send(ws.nickName + "加入了")
    })

    // 收到消息后原样返回
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(data)
            }
        })
    })

    ws.on('close', function close() {
        wss.clients.forEach(function each(client) {
            client.send(ws.nickName + "离开了")
            clientCount--
        })
    })
});

router.get("/socket", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


module.exports = router