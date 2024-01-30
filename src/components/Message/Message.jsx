// react
import { useEffect } from 'react'
// react redux
import { useSelector, useDispatch } from 'react-redux'
// utils
import { fetchMessages } from '../../utils/message'
// store
import { messageActions } from '../../store/messageStore/message-redux'

// components
import Card from '../UI/Card/Card'
import MessageTable from './MessageTable/MessageTable'
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner'

const Message = () => {
	const listOfMessages = useSelector(state => state.messageReducer.messages)
	const dispatch = useDispatch()

	useEffect(() => {
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
	}, [])

	return (
		<>
			<Card>
				{listOfMessages.length > 0 ? <MessageTable /> : <LoadingSpinner />}
			</Card>
		</>
	)
}

export default Message
