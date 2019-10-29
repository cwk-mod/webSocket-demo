let exress = require("express");
let router = exress.Router();
let webSocket = require('ws');

// router.get("/", function (req, res) {
//     res.end("hello socket")
// })

let wss = new webSocket.Server({ port: 2333 });

wss.on('connection', function connection(ws) {
    console.log("server receive connection.")

    // 收到消息后原样返回
    ws.on('message', function incoming(message) {
        ws.send(message)
    })
});

router.get("/socket", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


module.exports = router