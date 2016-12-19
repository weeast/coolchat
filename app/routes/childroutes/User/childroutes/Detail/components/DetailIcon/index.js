import React, { Component, PropTypes } from 'react'

import hammerManagerCreator from "APP/common/hammer"

import './view.less'

class DetailIcon extends Component {
	constructor(props) {
		super(props)

		this.state = {set: 0}

		this.fileChange = this.fileChange.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
	}
	componentDidMount() {
		this.hammerManager = hammerManagerCreator(this.hammerElem, "Pan Pinch")
	}
	componentWillUnmount() {
		this.unbindMoveAndResize()
		this.hammerManager.stop(true)
		this.hammerManager.destroy()
	}
	bindMoveAndResize() {
		// 移动图片
		this.hammerManager.on("panstart", e => {
			this.origin = {
				left: parseInt(this.hammerElem.style.left),
				top: parseInt(this.hammerElem.style.top)
			}
		})
		this.hammerManager.on("panmove", e => {
			this.setState({
				left: this.origin.left + e.deltaX,
				top: this.origin.top + e.deltaY
			})
		})
		// 缩放
		this.hammerManager.on("pinchmove", e => {

		})
	}
	unbindMoveAndResize() {
		this.hammerManager.off("panstart panmove")
	}
	fileChange(e) {
		let file = e.target.files[0]
		let reader =  new FileReader()
		if(!file) return
		reader.readAsDataURL(file)
		reader.onload = e => {
			this.bindMoveAndResize()
			this.setState({
				set: 1,
				icon: reader.result
			})
		}
	}
	fileUpload(e) {
		if(this.state.set === 1){
			this.unbindMoveAndResize()
			this.props.uploadFile(this.state.icon)
			this.setState({
				set: 2,
				left: 0,
				top: 0
			})
			e.preventDefault()
		}
	}
	render() {
		return (
			<div className={`md-userdetail-icon ${this.state.set===1?"upload":""}`}>
				<img 
					className="detail-icon" 
					style={{left: this.state.set===1?`${this.state.left}px`:"0",
						top:this.state.set===1?`${this.state.top}px`:"0"}}
					src={this.state.set>0?this.state.icon:this.props.icon}
					ref={hammerElem => this.hammerElem = hammerElem} />
				<label 
					className="detail-fileupload"
					onClick={this.fileUpload}>
					{this.state.set===1?"保存":"修改"}
					<input 
						className="icon-file"
						onChange={this.fileChange}
						type="file" />
				</label>
			</div>
		)
	}
}

DetailIcon.propTypes = {
	icon: PropTypes.string.isRequired,
	uploadFile: PropTypes.func.isRequired
}

export default DetailIcon