// react
import { useState } from 'react'
// react redux
import { useSelector, useDispatch } from 'react-redux'
// react-thunk
import { fncFetchMessages } from '../../../store/messageStore/message-thunk'
// tabler icons
import { IconEdit, IconTrash } from '@tabler/icons-react'
// utils
import { messageActions } from '../../../store/messageStore/message-redux'
// utils
import { deleteMessage } from '../../../utils/message'
// components
import AddMessageModal from '../AddMessageModal/AddMessageModal'
import DeleteModal from '../../UI/DeleteModal/DeleteModal'

const MessageTable = () => {
	const listOfMessages = useSelector(state => state.messageReducer.messages)
	const [openNewMessageModal, setOpenNewMessageModal] = useState(false)
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const dispatch = useDispatch()

	const openNewMessageModalHandler = () => {
		setOpenNewMessageModal(true)
	}

	const closeNewMessageModalHandler = () => {
		dispatch(messageActions.resetEditMessage())
		setOpenNewMessageModal(false)
	}

	const onEditMessageHandler = message => {
		console.log(message)
		dispatch(messageActions.editMessage(message))
		setOpenNewMessageModal(true)
	}

	const closeDeleteModalHandler = () => {
		setOpenDeleteModal(false)
	}

	const onDeleteMessageHandler = id => {
		console.log(`Deleting the message with the following id: ${id}`)
		deleteMessage(id)
			.then(response => {
				setOpenDeleteModal(true)
				console.log(response)
				if (response === null) {
					dispatch(
						messageActions.deleteModal({
							title: 'Delete message',
							type: 'success',
							message: 'Message deleted successfully!',
						}),
					)
					setTimeout(() => {
						setOpenDeleteModal(false)
					}, 2000)
				} else {
					dispatch(
						messageActions.deleteModal({
							type: 'error',
							title: 'Error',
							message: "Sorry! The message wasn't deleted.",
						}),
					)
				}
			})
			.finally(() => {
				dispatch(fncFetchMessages())
			})
	}

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='flex justify-between pb-4 bg-white dark:bg-gray-900'>
				<div>
					<button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
						Send
					</button>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3'
						onClick={openNewMessageModalHandler}
					>
						Add new message
					</button>
				</div>
				<label htmlFor='table-search' className='sr-only'>
					Search
				</label>
				<div className='relative mt-1'>
					<div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
						<svg
							className='w-4 h-4 text-gray-500 dark:text-gray-400'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 20 20'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
							/>
						</svg>
					</div>
					<input
						type='text'
						id='table-search'
						className='block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Search for items'
					/>
				</div>
			</div>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-all-search'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-all-search' className='sr-only'>
									checkbox
								</label>
							</div>
						</th>
						<th scope='col' className='px-6 py-3'>
							Message
						</th>
						<th scope='col' className='px-6 py-3'>
							Source
						</th>
						<th scope='col' className='px-6 py-3'>
							Category
						</th>
						<th scope='col' className='px-6 py-3'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{listOfMessages.map(message => (
						<tr
							key={message.message_id}
							className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
						>
							<td className='w-4 p-4'>
								<div className='flex items-center'>
									<input
										id='checkbox-table-search-1'
										type='checkbox'
										className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
									/>
									<label htmlFor='checkbox-table-search-1' className='sr-only'>
										checkbox
									</label>
								</div>
							</td>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-900 whitespace-pre-line dark:text-white'
							>
								{message.message}
							</th>
							<td className='px-6 py-4 md:whitespace-nowrap font-semibold'>
								{message.source}
							</td>
							<td className='px-6 py-4 md:whitespace-nowrap'>
								<span className='bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'>
									{message.category.name}
								</span>
							</td>
							<td className='px-6 py-4 '>
								<div className='flex items-center '>
									<button
										className='font-medium text-blue-500 dark:text-blue-500 hover:text-blue-700'
										onClick={() => onEditMessageHandler(message)}
									>
										<IconEdit />
									</button>
									<button
										className='font-medium text-red-500 dark:text-red-500 hover:text-red-700 ms-3'
										onClick={() => onDeleteMessageHandler(message.message_id)}
									>
										<IconTrash />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* Headless UI */}
			{openNewMessageModal && (
				<AddMessageModal
					isOpen={openNewMessageModal}
					closeModal={closeNewMessageModalHandler}
				/>
			)}
			{openDeleteModal && (
				<DeleteModal
					isOpen={openDeleteModal}
					closeModal={closeDeleteModalHandler}
				/>
			)}
		</div>
	)
}

export default MessageTable
