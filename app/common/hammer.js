import Hammer from "hammerjs"
import _ from "lodash"

export default function hammerManagerCreator (elem, type) {
	if(typeof elem === "string")
		elem = document.getElementById(elem)

	let hammerManager = new Hammer.Manager(elem)

	// 识别的手势类型
	type = type.trim().split(/\s+/g)
	_.each(type, function(e){
		hammerManager.add(Hammer[e]?new Hammer[e]():null)
	})

	return hammerManager
}