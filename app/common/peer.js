import SJJ from 'sdp-jingle-json'
import webrtcsupport from './webrtcsupport'
import Emitter from './emitter'
import _ from 'lodash'

import logger from './logger'

export default class PeerConnection extends Emitter {
    /**
     * 检查ice凭证
     */
    static checkCandidate(candidate) {
        let cand = SJJ.toCandidateJSON(candidate)

        return {
            hadStunCandidate: cand.type == 'srflx' ? true : false,
            hadRelayCandidate: cand.type == 'relay' ? true : false,
            hadIPv6Candidate: cand.ip.indexOf(':') != -1 ? true : false
        }
    }

    constructor(config, callback) {
        super()

        if(!webrtcsupport.supportRTCPeerConnection) {
            callback&&callback({code: 0, messages: "浏览器不支持peerConnection。"})
            return null
        } else {
            this.pc = new webrtcsupport.PeerConnection(config)

            this.getLocalStreams = this.pc.getLocalStreams.bind(this.pc)
            this.getRemoteStreams = this.pc.getRemoteStreams.bind(this.pc)
            this.addStream = this.pc.addStream.bind(this.pc)
            this.removeStream = this.pc.removeStream.bind(this.pc)

            // proxy some events directly
            this.pc.onremovestream = this.emit.bind(this, 'removeStream')
            this.pc.onaddstream = this.emit.bind(this, 'addStream')
            this.pc.onnegotiationneeded = this.emit.bind(this, 'negotiationNeeded')
            this.pc.oniceconnectionstatechange = this.emit.bind(this, 'iceConnectionStateChange')
            this.pc.onsignalingstatechange = this.emit.bind(this, 'signalingStateChange')

            // handle ice candidate and data channel events
            this.pc.onicecandidate = this._onIce.bind(this)
            this.pc.ondatachannel = this._onDataChannel.bind(this)

            this.localDescription = {
                contents: []
            }
            this.remoteDescription = {
                contents: []
            }

            this.iceCredentials = {
                local: {},
                remote: {}
            }

            this._remoteDataChannels = []
            this._localDataChannels = []

            this.config = {
                debug: process.env.__DEV__,
                sid: '',
                sdpSessionID: _.now(),
            }

            // apply our config
            for (let item in config) {
                this.config[item] = config[item]
            }

            /*if(this.config.debug){
                this.on('*', () => {
                    logger.log("PeerConnection event: ", arguments)
                })
            }*/

            callback&&callback({code: 1})

            return this
        }
    }

    get signalingState() {
        return this.pc.signalingState
    }

    get iceConnectionState() {
        return this.pc.iceConnectionState
    }

    _onIce(event) {
        logger.log("local ice candidate get")

        let candidate = event.candidate
        if(candidate){
            /*if(this.iceCredentials.local[candidate.sdpMLineIndex]) {
                candidate = this.iceCredentials.local[candidate.sdpMLineIndex]
            } else{
                this.iceCredentials.local[candidate.sdpMLineIndex] = candidate
            }*/
            this.emit("iceCandidate", candidate)
        }
    }

    _onDataChannel(event) {
        logger.log("remote addchannel")

        let channel = event.channel

        this._remoteDataChannels.push(channel)

        this.emit('addChannel', channel)
    }

    /**
     * 创建offer 并 设置本地sdp
     */
    offer({audio = false, video = false}, callback) {
        let mediaConstraints = {
            offerToReceiveAudio: audio?1:0,
            offerToReceiveVideo: video?1:0
        }
        callback = callback || function() {}

        if (this.pc.signalingState === 'closed') return callback('已断开链接')

        this.pc.createOffer(
            offer => {
                this.pc.setLocalDescription(
                    offer,
                    () => {
                        logger.log("local description set")
                        this.emit("offer", offer)
                        callback(null, offer)
                    },
                    err => {
                        this.emit("error", {message: "设置本地sdp出错", err: err})
                        callback(err)
                    }
                )
            },
            err => {
                this.emit("error", {message: "创建offer出错", err: err})
                callback(err)
            },
            mediaConstraints
        )
    }

    /**
     * 接收offer 并 设置远程sdp
     */
    handleOffer(offer, callback) {
        callback = callback || function() {}

        this.pc.setRemoteDescription(new webrtcsupport.SessionDescription(offer),
            () => {
                logger.log("remote description set")
                callback()
            },
            (err) => {
                this.emit("error", {message: "设置远程sdp出错", err: err})
                callback(err)
            }
        )
    }

    /**
     * 创建answer 并 设置本地sdp
     */
    answer({audio = false, video = false}, callback) {
        let mediaConstraints = {
                mandatory: {
                    OfferToReceiveAudio: audio,
                    OfferToReceiveVideo: video
                }
            }
        callback = callback || function() {}

        if(!this.pc.remoteDescription){
            this.emit("error", {message: "为设置远程端会话描述(remoteDescription)"})
        }

        if(this.pc.signalingState === "closed") return callback("已断开链接")

        this.pc.createAnswer(
            answer => {
                this.pc.setLocalDescription(
                    answer,
                    () => {
                        logger.log("local description set")

                        this.emit("answer", answer)
                        callback(null, answer)
                    },
                    err => {
                        this.emit("error", {message: "设置本地sdp出错", err:err})
                        callback(err)
                    }
                )
            },
            err => {
                this.emit("error", {message: "创建answer出错", err:err})
                callback(err)
            },
            mediaConstraints
        )
    }

    /**
     * 接收answer 并 设置远程sdp
     */
    handleAnswer(answer, callback){
        callback = callback || function() {}

        this.pc.setRemoteDescription(new webrtcsupport.SessionDescription(answer),
            () => {
                logger.log("remote description set")
                callback()
            },
            (err) => {
                this.emit("error", {message: "设置远程sdp出错", err: err})
                callback(err)
            }
        )
    }

    /**
     * 添加远程ice
     */
    addIce(candidateJson) {
        let candidate = new webrtcsupport.IceCandidate(candidateJson)

        this.pc.addIceCandidate(
            candidate,
            () => {logger.log("remote ice candidate set")},
            err => {
                this.emit("error", err)
            }
        )
    }

    /**
     * 添加流数据
     */
    addStream(stream) {
        this.localStream = stream
        this.pc.addStream(stream)

        logger.log("local add stream")
    }

    /**
     * 创建数据通道
     */
    createDataChannel(name, options) {
        if(!webrtcsupport.supportDataChannel){
            this.emit("error", {message:"浏览器不支持DataChannel"})
            return null
        }
        let channel = this.pc.createDataChannel(name, options)

        logger.log("local data channel open")

        this._localDataChannels.push(channel)

        return channel
    }

    /**
     * 关闭peer链接
     */
    close() {
        this.pc.close()

        this._localDataChannels = []
        this._remoteDataChannels = []

        logger.log("local peer close")
        this.emit('close')
    }

    /**
     * 关闭data channel
     */
    closeChannel() {
        this._localDataChannels = []
        this._remoteDataChannels = []
    } 

    /**
     * 获取peer链接状态
     */
    getStats(callback) {

        this.pc.getStats(null,
            function (res) {
                callback && callback(null, res)
            },
            function (err) {
                callback && callback(err)
            }
        )
    }

    destroy() {
        this.close()

        this.localDescription = null
        this.remoteDescription = null

        this.iceCredentials = null

        this._remoteDataChannels = null
        this._localDataChannels = null

        this.localStream = null
    }
}