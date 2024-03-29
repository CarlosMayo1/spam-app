// react
import { useEffect } from 'react'
// react redux
import { useSelector, useDispatch } from 'react-redux'
// redux thunk
import { fncFetchMessages } from '../../store/messageStore/message-thunk'
// components
import Card from '../UI/Card/Card'
import MessageTable from './MessageTable/MessageTable'
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner'

const Message = () => {
	const listOfMessages = useSelector(state => state.messageReducer.messages)

	const filter = useSelector(state => state.messageReducer.filter)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fncFetchMessages(filter))
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
