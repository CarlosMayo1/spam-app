// utils
import { fetchMessages } from '../../utils/message'
// store
import { messageActions } from './message-redux'

export const fncFetchMessages = () => {
	return async function fetchAllMessages(dispatch) {
		fetchMessages().then(response => {
			console.log(response)
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
		})
	}
}
