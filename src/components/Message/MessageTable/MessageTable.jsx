// react
import { useState, useEffect } from 'react'
// react redux
import { useSelector, useDispatch } from 'react-redux'
// react-select
import Select from 'react-select'
// react-thunk
import { fncFetchMessages } from '../../../store/messageStore/message-thunk'
import { fncFetchCategoriesForSelect } from '../../../store/categoryStore/category-thunk'
// tabler icons
import { IconEdit, IconTrash } from '@tabler/icons-react'
// utils
import { messageActions } from '../../../store/messageStore/message-redux'
// utils
import { deleteMessage, searchBarMessage } from '../../../utils/message'
// components
import AddMessageModal from '../AddMessageModal/AddMessageModal'
import DeleteModal from '../../UI/DeleteModal/DeleteModal'

const MessageTable = () => {
	const listOfMessages = useSelector(state => state.messageReducer.messages)
	const listOfCategories = useSelector(
		state => state.categoryReducer.categoriesForReactSelect,
	)
	const filter = useSelector(state => state.messageReducer.filter)
	const [openNewMessageModal, setOpenNewMessageModal] = useState(false)
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [query, setQuery] = useState('')
	const dispatch = useDispatch()

	const onSendMessage = () => {
		console.log('sending message')
		const number = '+51956533328'
		const message = 'hello world'
		let url = `https://web.whatsapp.com/send?phone=${number}`
		url += `&text=${encodeURI(message)}&app_absent=0`
		window.open(url)
	}

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
				dispatch(fncFetchMessages(filter))
			})
	}

	const onFilterByCategoryHandler = selectedOption => {
		const filterByCategory = {
			...filter,
			category: {
				name: selectedOption.label,
				category: 'category.name',
			},
		}
		dispatch(fncFetchMessages(filterByCategory))
		dispatch(messageActions.addFilter(filterByCategory))
	}

	const onShowNumberOfRecords = e => {
		const numberOfRecords = {
			...filter,
			limit: e.target.value,
		}
		console.log(e.target.value)
		dispatch(fncFetchMessages(numberOfRecords))
		dispatch(messageActions.addFilter(numberOfRecords))
	}

	useEffect(() => {
		dispatch(fncFetchCategoriesForSelect())
	}, [])

	useEffect(() => {
		const searchByQuery = {
			...filter,
			query,
		}
		const onSearchByInput = setTimeout(() => {
			searchBarMessage(query).then(response => {
				console.log(response)
				dispatch(fncFetchMessages(searchByQuery))
			})
		}, 500)

		return () => clearTimeout(onSearchByInput)
	}, [query])

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='flex flex-col md:flex-row justify-between pb-2 bg-white dark:bg-gray-900 px-4'>
				<div className='flex flex-col mb-2 md:flex-row md:flex md:justify-start'>
					<button
						className='mb-2 md:mb-0 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
						onClick={onSendMessage}
					>
						Send
					</button>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  ml-0 md:ml-3'
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
						className='w-full block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg md:w-80 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
						placeholder='Search for items'
						onChange={e => setQuery(e.target.value)}
					/>
				</div>
			</div>
			<div className='w-full flex flex-col md:flex-row justify-between px-4 mb-4'>
				<div className='flex flex-col items-start md:flex-row md:items-center'>
					<label
						htmlFor='categories'
						className='block mr-0 md:mr-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						filter by
					</label>
					<Select
						className='w-full mb-2 md:mb-0 md:w-64 mr-1.5'
						options={listOfCategories}
						defaultValue=''
						onChange={onFilterByCategoryHandler}
					/>
				</div>

				<div className='flex flex-col items-start md:flex-row md:items-center'>
					<label
						htmlFor='records'
						className='block mr-0 md:mr-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Records per page
					</label>
					<select
						id='records'
						className='w-full md:w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						onChange={onShowNumberOfRecords}
					>
						<option defaultValue={10}>10</option>
						<option value='15'>15</option>
						<option value='20'>20</option>
						<option value='25'>25</option>
					</select>
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
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Message
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Source
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Category
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
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
								className='px-0 py-2 lg:px-6 lg:py-4 text-xs lg:text-sm  font-medium text-gray-900 whitespace-pre-line dark:text-white'
							>
								{message.message}
							</th>
							<td className='px-2 py-0 lg:px-6 lg:py-4 lg:whitespace-nowrap text-xs lg:text-sm font-semibold'>
								{message.source}
							</td>
							<td className='px-2 py-0 lg:px-6 lg:py-4 lg:whitespace-nowrap'>
								<span className='bg-gray-200 text-gray-800 text-xs lg:text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'>
									{message.category.name}
								</span>
							</td>
							<td className='px-2 py-0 lg:px-6 lg:py-4'>
								<div className='flex items-center '>
									<button
										className='font-medium text-blue-500 dark:text-blue-500 hover:text-blue-700'
										onClick={() => onEditMessageHandler(message)}
									>
										<IconEdit />
									</button>
									<button
										className='font-medium text-red-500 dark:text-red-500 hover:text-red-700 ms-1.5 lg:ms-3'
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
