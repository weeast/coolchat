import io from 'socket.io-client'

import logger from './logger'

function _handleServerCallback(callback) {
	return function(res) {
		/*if(res&&!res.code) {
			logger.log("Socket Error: " + res.message)
		}*/

		callback(res)
	}
}

export default class SocketIoConnection {
	constructor(config) {
		this.connection = io.connect(config.url, config.socketio)
	}

	on(eventname, callback) {
		this.connection.on(eventname, _handleServerCallback(callback))
	}

	emit() {
		this.connection.emit.apply(this.connection, arguments)
	}

	getSessionid() {
		return this.connection.id
	}

	disconnect() {
		return this.connection.disconnect()
	}
}