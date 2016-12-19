import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import "./view.less"

class ChannelList  extends Component {
	render() {
		return (
			<div className="md-userhot-channels">
				{
					this.props.channels.map((channel, index) => 
						<Link
							key={index}
							to={`/channel/${channel.get("id")}`} 
							className="channel-item">
							<p className="icon-wrap">
								<img className="channel-icon" src={channel.get("icon")} alt={channel.get("name")} />
							</p>
							<p className="channel-info">
								<span className="channel-name">{channel.get("name")}</span>
								<span className="channel-number">{channel.get("number")}人</span>
							</p>
						</Link>
					)
				}
			</div>
		)
	}
}

export default ChannelList