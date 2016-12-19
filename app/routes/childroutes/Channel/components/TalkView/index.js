import React, { Component, PropTypes } from 'react'
import Bubble from '../Bubble'
import UserHeader from '../UserHeader'
import { List } from 'immutable'
import './view.less'

class TalkView extends Component {
	
	render() {
		return (
			<div className="md-channel-talkview">
				{
					this.props.talkData.map((list,index)=> {
						let text = list.get('text')
						let imgSrc = list.get('imgSrc')

						if(index%2 == 1){
							return(
								<div  className="talk-left" key={index}>
									<Bubble  className="bubble-left" text={text}/>
									<UserHeader imgSrc={imgSrc}/>
								</div>
							)
						}else{
							return(
								<div className="talk-right" key={index}>
									<UserHeader imgSrc={imgSrc}/>
									<Bubble  className="bubble-right" text={text}/>
								</div>
							)
						}
						
					})
				}
			</div>
		)
	}
}

TalkView.propTypes = {
	talkData: PropTypes.instanceOf(List).isRequired
}

export default TalkView