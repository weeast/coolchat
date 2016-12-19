import client from 'SERVER/common/client'
import Promise from 'bluebird'

/**
 * 按id查询
 */
export function queryById (uid) {
	return new Promise( (reslove, reject) => {
		if(uid) {
			reslove({
				uid: uid,
				name: uid%2?"weeast":"xixi",
				mail: uid%2?"475097021@qq.com":"abcd@efg.com"
			})
		} else {
			reslove()
		}
		/*client.get('user?' + uid)
			.then( result => {
				reslove(result.body)
			})
			.catch( err => {
				reject(err)
			})*/
	})
}