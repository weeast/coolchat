import SocketIoConnection from 'APP/common/socketio'
import * as WebRtc from 'APP/common/webrtc'

/*let io = new SocketIoConnection({url: process.env.SOCKET_SERVER})

io.on("connect", param => {
	io.emit("send_join", {room:"default", uid:1})
})

io.on("rec_join", data => {
	console.info("recive join: " , data)
})

io.on("rec_users", data => {
	console.info("recive users: " , data)
})

io.on("rec_leave", data => {
	console.info("recive leave: " , data)
})*/
let rtc = new WebRtc.WebrtcManager()

rtc.on(WebRtc.SOCKET_CONNECT, () => {
	console.info("socket connected")
})

rtc.on(WebRtc.PEER_USERS, users => {
	console.info("get user list: ", users)
})

rtc.on(WebRtc.PEER_JOIN, user => {
	console.info("user join: ", user)
})

rtc.on(WebRtc.PEER_LEAVE, user => {
	console.info("user leave: ", user)
})

rtc.on(WebRtc.PEER_READY, user => {
	rtc.sendMessage({message: "hello world"})
})

rtc.on(WebRtc.PEER_MESSAGE, ({user, message}) => {
	console.info("user message: ", user, message)
})

rtc.on(WebRtc.PEER_MEDIASTREAM_ON, ({stream}) => {
	console.info("get stream")
})

rtc.on(WebRtc.PEER_MEDIASTREAM_OFF, id => {
	console.info("stream close: ", id)
})