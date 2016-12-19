import _ from 'lodash'

import logger from './logger'

/**
 * 用户发出offer
 */
export const EVENT_OFFER = "send_offer"
export const registOffer = ioServer => socket => data => {
	let recId = data.to
	let offer = data.offer

	logger.log(_.now() + ": a offer from id: "+socket.id+" to "+recId)
	if(recId) {
		socket.broadcast.in(recId).emit(
			"rec_offer",
			{senderId: socket.id, offer: offer}
		)
	}
}

/**
 * 用户发出answer
 */
export const EVENT_ANSWER = "send_answer"
export const registAnswer = ioServer => socket => data => {
	let recId = data.to
	let answer = data.answer

	logger.log(_.now() + ": a answer from id: "+socket.id+" to "+recId)
	if(recId) {
		socket.broadcast.in(recId).emit(
			"rec_answer",
			{senderId: socket.id, answer: answer}
		)
	}
}

/**
 * 用户发出ice
 */
export const EVENT_ICE = "send_ice"
export const registIce = ioServer => socket => data => {
	let recId = data.to
	let candidateJson = data.candidateJson

	logger.log(_.now() + ": a ice from id: "+socket.id+" to "+recId)
	if(recId) {
		socket.broadcast.in(recId).emit(
			"rec_ice",
			{senderId: socket.id, candidateJson: candidateJson}
		)
	}
}