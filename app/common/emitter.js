import _ from 'lodash'

export default class emitter {
	constructor(){
		this.events = {}
	}

	on(eventname, callback) {
		this.events[eventname] = this.events[eventname] || []
		this.events[eventname].push(callback)
	}

	off(eventname, handler) {
		if(!eventname) {
			this.events = {}
		} else if(!this.events[eventname]) {
			return
		} else if(!handler) {
			this.events[eventname] = null
			delete this.events[eventname]
		} else {
			_.remove(this.events[eventname], eventHandler => {
				return _.isEqual(eventHandler, handler)
			})
		}
	}

	emit(eventname, ...eventargs) {
		if(this.events[eventname]){
			this.events[eventname].concat(this.events["*"]||[]).forEach( cb =>
				setTimeout(cb.apply(this, eventargs))
			)
		}
	}

	destory() {
		this.off()

		this.events = null
	}
}