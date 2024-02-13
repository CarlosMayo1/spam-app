// react
import { useState } from 'react'
// components
import AddNewContactModal from '../AddNewContanctModal/AddNewContactModal'

const ContactTable = () => {
	const [isOpen, setIsOpen] = useState(false)
	const onOpenNewContactModal = () => {
		setIsOpen(true)
		console.log('Adding a new user')
	}

	const onCloseNewContactModal = () => {
		setIsOpen(false)
	}

	return (
		<div>
			<div className='flex flex-col mb-2 md:flex-row md:flex md:justify-start'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  ml-0 md:ml-3'
					onClick={onOpenNewContactModal}
				>
					Add new contact
				</button>
			</div>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Name
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							# Number
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Alias
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Tag
						</th>
						<th scope='col' className='px-0 py-0 lg:px-6 md:py-3'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						// key={message.message_id}
						className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
					>
						<th
							scope='row'
							className='px-0 py-2 lg:px-6 lg:py-4 text-xs lg:text-sm  font-medium text-gray-900 whitespace-pre-line dark:text-white'
						>
							Carlos Mayo
						</th>
						<td className='px-2 py-0 lg:px-6 lg:py-4 lg:whitespace-nowrap text-xs lg:text-sm font-semibold'>
							956533328
						</td>
						<td className='px-2 py-0 lg:px-6 lg:py-4 lg:whitespace-nowrap text-xs lg:text-sm font-semibold'>
							Mayo
						</td>
						<td className='px-2 py-0 lg:px-6 lg:py-4 lg:whitespace-nowrap'>
							<span className='bg-gray-200 text-gray-800 text-xs lg:text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'>
								Friend
							</span>
						</td>
						<td className='px-2 py-0 lg:px-6 lg:py-4'>
							<div className='flex items-center '>
								<button
									className='font-medium text-blue-500 dark:text-blue-500 hover:text-blue-700'
									// onClick={() => onEditMessageHandler(message)}
								>
									{/* <IconEdit /> */}
									Editar
								</button>
								<button
									className='font-medium text-red-500 dark:text-red-500 hover:text-red-700 ms-1.5 lg:ms-3'
									// onClick={() => onDeleteMessageHandler(message.message_id)}
								>
									{/* <IconTrash /> */}
									Eliminar
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			{/* Headless UI */}
			{isOpen && (
				<AddNewContactModal
					isOpen={isOpen}
					closeModal={onCloseNewContactModal}
				/>
			)}
		</div>
	)
}

export default ContactTable
