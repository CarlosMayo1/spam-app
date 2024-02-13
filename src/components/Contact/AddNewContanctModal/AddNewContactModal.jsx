// react
import { Fragment, useState, useEffect } from 'react'
//react redux
import { useSelector, useDispatch } from 'react-redux'
// react select
import Select from 'react-select'
// headlessui
import { Dialog, Transition } from '@headlessui/react'
// react hook form
import { useForm, Controller } from 'react-hook-form'
// utils
import {
	searchMessage,
	insertNewMessage,
	updateMessage,
} from '../../../utils/message'
// redux thunk
import { fncFetchMessages } from '../../../store/messageStore/message-thunk'
import { fncFetchTags } from '../../../store/tagStore/tag-thunk'
// components
import SuccessAlert from '../../UI/Alert/SuccessAlert/SuccessAlert'
import ErrorAlert from '../../UI/Alert/ErrorAlert/ErrorAlert'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'
import { insertNewContact } from '../../../utils/contact/contact'

const AddContactModal = ({ isOpen, closeModal }) => {
	const [alertType, setAlertType] = useState(null)
	const [showLoading, setShowLoading] = useState(false)
	const editMessage = useSelector(state => state.messageReducer.editMessage)
	const categories = useSelector(
		state => state.categoryReducer.categoriesForReactSelect,
	)
	const filter = useSelector(state => state.messageReducer.filter)
	const listOfTags = useSelector(state => state.tagReducer.listOfTags)
	const dispatch = useDispatch()
	const {
		control,
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			// message: Object.keys(editMessage).length === 0 ? '' : editMessage.message,
			// source: Object.keys(editMessage).length === 0 ? '' : editMessage.source,
			// category:
			// 	Object.keys(editMessage).length === 0
			// 		? ''
			// 		: {
			// 				label: editMessage.category.name,
			// 				value: editMessage.category.category_id,
			// 		  },
		},
	})

	const onSubmitFormHandler = handleSubmit(data => {
		console.log(data)
		const addContact = {
			name: data.name,
			phone_number: data.phone,
			tag_id: data.tag.value,
		}

		insertNewContact(addContact).then(response => console.log(response))

		// setShowLoading(true)
		// const newMessage = {
		// 	message: data.message,
		// 	source: data.source,
		// 	category_id: data.category.value,
		// 	status: 1,
		// }

		// if the edt button was clicked
		// if (Object.keys(editMessage).length > 0) {
		// 	// adding the uuid to be edited
		// 	newMessage['message_id'] = editMessage.message_id

		// 	updateMessage(newMessage)
		// 		.then(response => {
		// 			if (response === undefined) {
		// 				setAlertType('success')
		// 			}
		// 		})
		// 		.finally(() => {
		// 			dispatch(fncFetchMessages(filter))
		// 			setShowLoading(false)
		// 			setTimeout(() => {
		// 				closeModal()
		// 			}, 2000)
		// 		})
		// 	console.log('editing this messsage')
		// } else {
		// 	searchMessage(newMessage.message)
		// 		.then(response => {
		// 			if (response.length > 0) {
		// 				setError('message', {
		// 					type: 'custom',
		// 					message: 'This message has already added!',
		// 				})
		// 				console.log(response)
		// 				return
		// 			} else {
		// 				insertNewMessage(newMessage)
		// 					.then(response => {
		// 						if (response === undefined) {
		// 							setAlertType('success')
		// 							reset()
		// 						} else {
		// 							setAlertType('error')
		// 						}
		// 						console.log(response)
		// 					})
		// 					.finally(() => {
		// 						setShowLoading(false)
		// 						dispatch(fncFetchMessages(filter))
		// 					})
		// 			}
		// 		})
		// 		.finally(() => {
		// 			setShowLoading(false)
		// 		})
		// }
	})

	useEffect(() => {
		if (alertType === 'success') {
			setTimeout(() => {
				setAlertType(null)
			}, 2000)
		}
	}, [alertType])

	useEffect(() => {
		dispatch(fncFetchTags())
	}, [])

	const showAlert =
		alertType === 'success' ? (
			<SuccessAlert message='New message added successfully' />
		) : (
			<ErrorAlert message='Sorry! There was an error' />
		)

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black/25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Add New Contact
								</Dialog.Title>
								<div className='mt-2'>
									{/* Alert message */}
									{alertType && showAlert}
									<form onSubmit={onSubmitFormHandler}>
										<div className='mb-5'>
											<label
												htmlFor='name-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Name
											</label>
											<input
												type='text'
												id='name-input'
												autoComplete='off'
												className={`${
													errors.name && 'border-red-500 focus:border-red-500'
												} outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
												placeholder='Nombre del contacto'
												{...register('name', {
													required: {
														value: true,
														message: 'This field cannot be empty! ',
													},
												})}
											/>
											<div>
												<p className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
													{errors.name && errors.name.message}
												</p>
											</div>
										</div>
										<div className='mb-5'>
											<label
												htmlFor='name-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Phone number
											</label>
											<input
												type='text'
												id='phone-input'
												autoComplete='off'
												className={`${
													errors.name && 'border-red-500 focus:border-red-500'
												} outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
												placeholder='123 456 789'
												{...register('phone', {
													required: {
														value: true,
														message: 'This field cannot be empty! ',
													},
												})}
											/>
											<div>
												<p className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
													{errors.phone && errors.phone.message}
												</p>
											</div>
										</div>
										<div className='mb-5'>
											<label
												htmlFor='name-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Alias
											</label>
											<input
												type='text'
												id='alias-input'
												autoComplete='off'
												className=' outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='Pancho'
												{...register('alias')}
											/>
										</div>
										<div className='mb-5'>
											<label
												htmlFor='tag-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Tag
											</label>
											<Controller
												name='tag'
												control={control}
												rules={{
													value: true,
													required: 'This field cannot be empty!',
												}}
												defaultValue=''
												render={({ field }) => (
													<Select
														{...field}
														styles={{
															menuPortal: base => ({
																...base,
																zIndex: 9999,
																fontSize: '0.875rem',
																lineHeight: '1.25rem',
															}),
															control: (baseStyles, state) => ({
																...baseStyles,
																borderColor: errors.tag && 'red',
																outline: 'none',
																'&:hover': 'none',
																'&:focus': 'none',
																boxShadow: 'red',
																fontSize: '0.875rem',
																lineHeight: '1.25rem',
															}),
														}}
														maxMenuHeight={200}
														menuPortalTarget={document.body}
														options={listOfTags}
													/>
												)}
											/>
											<div>
												<p className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
													{errors.tag && errors.tag.message}
												</p>
											</div>
										</div>
										<div className='mt-4 text-center'>
											<button
												type='submit'
												className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
												disabled={showLoading}
											>
												{showLoading ? <LoadingSpinner /> : 'Add'}
											</button>
										</div>
									</form>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default AddContactModal
