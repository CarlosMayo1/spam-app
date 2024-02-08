// utils
import { fetchMessages, countTotalMesssage } from '../../utils/message'
// store
import { messageActions } from './message-redux'

export const fncFetchMessages = filter => {
	return async function fetchAllMessages(dispatch) {
		fetchMessages(filter).then(response => {
			console.log(response)

			if (response !== null) {
				const sortedArr = response.sort((a, b) => {
					if (a.message < b.message) {
						return -1
					}
					if (a.message > b.message) {
						return 1
					}
					return 0
				})
				dispatch(messageActions.fetchMessages(sortedArr))
			} else {
				dispatch(messageActions.fetchMessages(response))
			}
		})
	}
}

export const fncGetCountMessages = () => {
	return async function countAllMessages(dispatch) {
		countTotalMesssage().then(response => {
			console.log(response)
			dispatch(messageActions.getTotalMessages(response))
		})
	}
}
