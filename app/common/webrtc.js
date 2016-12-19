import webrtcsupport from './webrtcsupport'
import Emitter from './emitter'
import Peer from './peer'
import SocketIoConnection from './socketio'
import _ from 'lodash'

import logger from './logger'

// socket连接事件
export const SOCKET_CONNECT = Symbol('SOCKET_CONNECT')
export const SOCKET_CONNECT_ERROR = Symbol('SOCKET_CONNECT_ERROR')
export const SOCKET_CONNECT_TIMEOUT = Symbol('SOCKET_CONNECT_TIMEOUT')
export const SOCKET_RECONNECT = Symbol('SOCKET_RECONNECT')
export const SOCKET_RECONNECT_ERROR = Symbol('SOCKET_RECONNECT_ERROR')
export const SOCKET_RECONNECT_TIMEOUT = Symbol('SOCKET_RECONNECT_TIMEOUT')

// peer事件
export const PEER_USERS = Symbol('PEER_USERS')
export const PEER_JOIN = Symbol('PEER_JOIN')
export const PEER_LEAVE = Symbol('PEER_LEAVE')
export const PEER_READY = Symbol('PEER_READY')
export const PEER_MESSAGE = Symbol('PEER_MESSAGE')
export const PEER_MEDIASTREAM_ON = Symbol('PEER_MEDIASTREAM_ON')
export const PEER_MEDIASTREAM_OFF = Symbol('PEER_MEDIASTREAM_OFF')

export class WebrtcManager extends Emitter {
	constructor(config) {
		super()

		this.socketConnection = new SocketIoConnection({url: process.env.SOCKET_SERVER})

		// 代理socket连接事件
		this.socketConnection.on("connect", this._init.bind(this))
		this.socketConnection.on("connect_error", this.emit.bind(this, SOCKET_CONNECT_ERROR))
		this.socketConnection.on("connect_timeout", this.emit.bind(this, SOCKET_CONNECT_TIMEOUT))
		this.socketConnection.on("reconnect", this._init.bind(this))
		this.socketConnection.on("reconnect_error", this.emit.bind(this, SOCKET_RECONNECT_ERROR))
		this.socketConnection.on("reconnect_timeout", this.emit.bind(this, SOCKET_RECONNECT_TIMEOUT))
		// 频道消息
		this.socketConnection.on("rec_users", this._users.bind(this))
		this.socketConnection.on("rec_join", this._join.bind(this))
		this.socketConnection.on("rec_leave", this._leave.bind(this))
		// webrtc消息
		this.socketConnection.on("rec_offer", this._offer.bind(this))
		this.socketConnection.on("rec_answer", this._answer.bind(this))
		this.socketConnection.on("rec_ice", this._ice.bind(this))

		config = config || {}
		this.uid = config.uid || 1000,
		this.room = config.room || 'default'

		this.users = {}

		this.config = {
			debug: process.env.__DEBUG__,
			constraints: {
				audio: false,
                video: false
			}
		}

		// apply our config
        for (let item in config) {
            this.config[item] = config[item]
        }
	}

	// 初入频道
	_init() {
		this.socketConnection.emit("send_join", {room: this.room, uid: this.uid})

		/**
		 * 进入频道
		 */
		this.emit(SOCKET_CONNECT)
	}

	// 广播
	_broadcast({ users = this.users, channel, stream, removestream, offer, message }) {
		_.forIn(users, user => {
			// 消息
			if(channel&&user.channel) {
				user.channel.send(message)
			}
			// stream
			if(stream&&user.peer) {
				user.peer.addStream(stream)
			}
			// 关闭stream
			if(removestream&&user.peer) {
				user.peer.removeStream()
			}
			// offer
			if(offer&&user.peer) {
				user.peer.offer(this.config.constraints, (err,offer) => {
					if(err) return
					this.socketConnection.emit("send_offer", {
						to: user.sid,
						offer: offer
					})
				})
			}
		})
	}

	// 收到房间内所有人（包括自己）
	_users({ users = [] }) {
		// 先到的人为主人(host)
		users.forEach( user => {
			if(!user.sid.match(this.socketConnection.getSessionid())) {
				this._join({user: user, host: true})
			}
		})

		/**
		 * 收到用户列表
		 * @augments {array} users 用户列表
		 */
		this.emit(PEER_USERS, users)
	}

	// 其他用户加入
	_join({ user = {} , host }) {
		if(!user.sid) return

		let joinUser = this.users[user.sid] = {}

		_.assign(joinUser, user)
		joinUser.peer = new Peer(process.env.ICESERVER, res => {
			if(res.code) {
				logger.log("peerConnection建立成功")
			} else {
				logger.log(res.message)
			}
		})
		// 收到本地ice凭证
		joinUser.peer.on("iceCandidate", candidate => {
			this.socketConnection.emit("send_ice", {
				to: user.sid,
				candidateJson: candidate
			})
		})

		// 收到添加DataChannel
		joinUser.peer.on("addChannel", this._listen(user.sid))

		// 收到流媒体
		joinUser.peer.on("addStream", event => {
			this.remoteMediaStream = event.stream

			/**
			 * 收到媒体流
			 * @augments {binary} stream 视频流
			 */
			this.emit(PEER_MEDIASTREAM_ON, event.stream)
		})

		// 收到流媒体关闭
		joinUser.peer.on("removeStream", event => {
			this.remoteMediaStream = null

			/**
			 * 媒体流关闭
			 * @augments {string} sid 用户socketId
			 */
			this.emit(PEER_MEDIASTREAM_OFF, user.sid)
		})

		joinUser.peer.on("error", err => {
			logger.log(err.message + err.err)
		})

		joinUser.channel = joinUser.peer.createDataChannel(user.sid)

		if(host){
			this._broadcast({
				users: {join: joinUser},
				offer: true
			})
		}
		/**
		 * 新用户加入
		 * @augments {object} user 加入的用户
		 */
		if(!host) this.emit(PEER_JOIN, user)
	}

	// 其他用户离开
	_leave({ user = {} }) {
		let leaveUser = this.users[user.sid]

		if(!leaveUser) return

		leaveUser.peer.destroy()

		delete leaveUser.user
		delete leaveUser.peer

		delete this.users[user.sid]

		/**
		 * 用户离开
		 * @augments {object} user 离开的用户
		 */
		this.emit(PEER_LEAVE, user)
	}

	// 收到offer 
	_offer({ senderId, offer }) {
		let sender = this.users[senderId]

		if(!sender) return

		sender.peer.handleOffer(offer)

		sender.peer.answer(this.config.constraints, (err, answer) => {
			if(err) return

			this.socketConnection.emit("send_answer", {
				to: senderId,
				answer: answer
			})
		})
	}

	// 收到answer
	_answer({ senderId, answer }) {
		let sender = this.users[senderId]

		if(!sender) return

		sender.peer.handleAnswer(answer)

		// sender.peer.createDataChannel(senderId)
	}

	// 收到ice
	_ice({ senderId, candidateJson }) {
		let sender = this.users[senderId]

		if(!sender) return
		
		sender.peer.addIce(candidateJson)
	}

	// 监听data channel
	_listen(sid) {
		let user = this.users[sid]
		return channel => {
			logger.log("get remote data channel")

			channel.onopen = () => {
				logger.log("channel open with: " + sid)
				/**
				 * 数据通道准备就绪
				 * @augments {string} sid 对方id
				 */
				this.emit(PEER_READY, sid)
			}

			channel.onmessage = message => {
				/**
				 * 数据通道消息
				 * @augments {object} user 用户
				 * @augments {string} message 消息
				 */
				this.emit(PEER_MESSAGE, {user, message})
			}

			channel.onerror = err => {
				logger.log("channel error " + err)
			}

			channel.onclose = () => {
				delete user.channel
				user = null
			}
		}
	}

	// 创建data channel
	/*_channel({ sid, channelName }){
		if(!sid) return 

		let rec = this.users[sid]
		let channel = rec.peer.createDataChannel(channelName)
	
		this._broadcast({
			offer: true
		})
		rec.channel = channel
	}*/

	/**
	 * 传输视频
	 * @param  {Object}  
	 *         		except 排除的[Array|string]
	 *         		audio  音频
	 * @param  {Function} callback
	 */
	sendVideo({ except = [], audio }, callback) {
		this.config.constraints.audio = audio
		this.config.constraints.video = true

		if(!webrtcsupport.supportGetUserMedia) {
			callback({message: "浏览器不支持获取视频流"})
			return 
		}

		webrtcsupport.getUserMedia.call(navigator, options, stream => {
			this.localMediaStream = stream

			this._broadcast({
				users: _.omit(this.users, except),
				stream: stream,
				offer: true
			})
		})
	}

	/**
	 * 关闭视频
	 * @param  {Object} 
	 *         		except  排除[Array|String]
	 */
	closeVideo({ except = [] }) {
		this.config.constraints.audio = false
		this.config.constraints.video = false

		this.localMediaStream = null

		this._broadcast({
			users: _.omit(this.users, except),
			removestream: true
		})
	}

	/**
	 * 传输文本
	 * @param  {Object} 
	 *         		except  排除[Array|String]
	 *         		message 消息
	 */
	sendMessage({ except = [], message }) {
		if(!message) return

		this._broadcast({
			users: _.omit(this.users, except),
			channel: true,
			message: message
		})
	}

	destroy() {
		this.remoteMediaStream = null
		this.localMediaStream = null

		this.socketConnection.disconnect()
		_.forIn(this.users, user => {
			if(user.peer) user.peer.destroy()
			
			delete user.peer
			delete user.channel
		})
	}
}