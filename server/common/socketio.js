import socketio from 'socket.io'
import _ from 'lodash'

import env from 'ROOT/configs/environments'

import * as channel from './channel'
import * as webrtc from './webrtc'

export default class SocketIo {
	constructor(app) {
		this.io = socketio(app)
		this.nsp = env.SOCKET_NSP
		this.handlders = {}

		this._wait()
	}

	get namespace() {
		return this.io.nsps[this.nsp]
	}

	get nspsockets() {
		return this.io.nsps[this.nsp].sockets
	}

	get rooms() {
		return this.io.nsps[this.nsp].adapter.rooms
	}

	_wait() {
		this.io.of(this.nsp)
			.on('connection', socket => {
				_.forIn(this.handlders, (value, key) => {
					_.forEach(value, handler => {
						socket.on(key, handler(socket))
					})
				})
			})
	}

	regist(event, handlder) {
		this.handlders[event] = this.handlders[event] || []
		this.handlders[event].push(handlder(this))
	}

	socketsIn(room) {
		let roomSockets = _.keys(this.rooms[room].sockets)

		return _.pick(this.nspsockets, roomSockets)
	}
}

export function createSocketServe (app) {
	let server = new SocketIo(app)

	// 频道消息
	server.regist(channel.EVENT_JOIN, channel.registJoin)
	server.regist(channel.EVENT_LEAVE, channel.registLeave)
	// webrtc消息
	server.regist(webrtc.EVENT_OFFER, webrtc.registOffer)
	server.regist(webrtc.EVENT_ANSWER, webrtc.registAnswer)
	server.regist(webrtc.EVENT_ICE, webrtc.registIce)

	return server
}