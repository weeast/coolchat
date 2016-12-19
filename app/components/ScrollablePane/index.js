import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import hammerManagerCreator from "APP/common/hammer"

import "./view.less"

class ScrollablePane extends Component {
	constructor(props) {
		super(props)

		this.direct = this.props.aglin==="vertical"?"top":"left"
		this.shape = this.props.aglin==="vertical"?"height":"width"

		this.state = {
			distance: 0,
			rollBack: false
		}
	}
	componentDidMount() {
		// 初始化hammer
		this.hammerManager = hammerManagerCreator(this.$slider, "Pan")

		this.hammerManager.on("panstart", e => {
			this.originDist = parseInt(this.$slider.style[this.direct])
			
			// 取消弹性变化
			this.setState({rollBack: false})
		})

		this.hammerManager.on("panmove", e => {
			let distance = this.originDist + 
				(this.props.aglin==="vertical"?e.deltaY:e.deltaX)

			if(!this.props.rollBack)
				distance = isDistanceOverflow(distance, this.props.paneSize, this.props.sliderSize)

			this.setState({distance: distance})
		})

		// 超出弹性回退
		if(this.props.rollBack){
			this.hammerManager.on("panend pancancel", e => {
				let distance = parseInt(this.$slider.style[this.direct])

				distance = isDistanceOverflow(distance, this.props.paneSize, this.props.sliderSize)

				this.setState({distance: distance, rollBack: true})
			})
		}
	}
	componentWillUnmount() {
		// 注销touch事件 
		this.hammerManager.off("panstart panmove panend pancancel")
		this.hammerManager.stop(true)
		this.hammerManager.destroy()
	}
	render() {
		let paneStyle = {}
		let sliderStyle = {}

		paneStyle[this.shape] = `${this.props.paneSize}px`

		sliderStyle[this.shape] = `${this.props.sliderSize}px`
		sliderStyle[this.direct] = `${this.state.distance}px`

		return (
			<div 
				className={`ui-scroll-pane ${this.props.className||""}`}
				style={_.assign({},paneStyle,this.props.style)}>
				<div 
					className={`ui-scroll-slider ${this.state.rollBack?"ui-roll-back":""}`}
					ref={sliderElem => this.$slider = sliderElem} 
					style={sliderStyle}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

// 判断滑动距离是否超出
function isDistanceOverflow (distance, paneSize, sliderSize) {
	let overflow = paneSize - sliderSize

	// 向前超出 或 滑动版块不够长
	if(distance > 0 || overflow>0) return 0;

	// 在可滑动范围内
	else if(_.inRange(distance, overflow, 0)) return distance

	// 向后超出
	else return overflow
}

ScrollablePane.propsTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	// 弹性滑动
	rollBack: PropTypes.bool,
	// 滑动方式{horizontal||vertical}
	aglin: PropTypes.oneOf(['horizontal', 'vertical']),
	// 滑动版块大小
	sliderSize: PropTypes.number.isReRequired,
	// 滑动窗格大小
	paneSize: PropTypes.number.isReRequired,
}

export default ScrollablePane