import _ from 'lodash'
import Promise from 'bluebird'

import logger from './logger'
import * as User from 'SERVER/proxy/user'

/**
 * 用户加入频道
 */
export const EVENT_JOIN = "send_join"
export const registJoin = ioServer => socket => data => {
	let roomname = data.room
	let uid = data.uid

	logger.log(_.now() + ": a new connect from id: "+socket.id+" to room "+roomname)

	if(_.isString(roomname)) {
		socket.join(roomname)

		User.queryById(uid)
			.catch( err => {})
			.then( res => {
				// 保存个人信息到socket上
				socket.info = res
				socket.roomname = roomname
				// 通知其他人
				socket.broadcast.in(roomname).emit(
					"rec_join", 
					{user: _.assign({}, res, {sid: socket.id})}
				)
				// 房间内所有人信息
				let socketsInRoom = ioServer.socketsIn(roomname)
				let users = []
				for(let key in socketsInRoom) {
					let value = socketsInRoom[key]

					users.push(_.assign({}, value.info, {sid: key}))
				}
				socket.emit(
					"rec_users",
					{users: users}
				)
			})
	}
}

/**
 * 用户离开频道
 */
export const EVENT_LEAVE = "disconnect"
export const registLeave = ioServer => socket => () => {
	logger.log(_.now() + ": a disconnect from id: "+socket.id+" leave room "+socket.roomname)

	socket.broadcast.in(socket.roomname).emit(
		"rec_leave",
		{user: {sid: socket.id}}
	)
}