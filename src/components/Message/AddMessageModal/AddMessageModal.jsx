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
import { fetchCategories } from '../../../utils/category'
// store
import { categorySliceAction } from '../../../store/categoryStore/category-redux'
// components
import SuccessAlert from '../../UI/Alert/SuccessAlert/SuccessAlert'
import ErrorAlert from '../../UI/Alert/ErrorAlert/ErrorAlert'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'

const AddMessageModal = ({ isOpen, closeModal }) => {
	const [alertType, setAlertType] = useState(null)
	const [showLoading, setShowLoading] = useState(false)
	const editMessage = useSelector(state => state.messageReducer.editMessage)
	const categories = useSelector(
		state => state.categoryReducer.categoriesForReactSelect,
	)
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
			message: Object.keys(editMessage).length === 0 ? '' : editMessage.message,
			source: Object.keys(editMessage).length === 0 ? '' : editMessage.source,
			category:
				Object.keys(editMessage).length === 0
					? ''
					: {
							label: editMessage.category.name,
							value: editMessage.category.category_id,
					  },
		},
	})

	const onSubmitFormHandler = handleSubmit(data => {
		setShowLoading(true)
		const newMessage = {
			message: data.message,
			source: data.source,
			category_id: data.category.value,
			status: 1,
		}

		// if the edt button was clicked
		if (Object.keys(editMessage).length > 0) {
			// adding the uuid to be edited
			newMessage['message_id'] = editMessage.message_id

			updateMessage(newMessage)
				.then(response => {
					if (response === undefined) {
						setAlertType('success')
					}
				})
				.finally(() => {
					dispatch(fncFetchMessages())
					setShowLoading(false)
					setTimeout(() => {
						closeModal()
					}, 2000)
				})
			console.log('editing this messsage')
		} else {
			searchMessage(newMessage.message)
				.then(response => {
					if (response.length > 0) {
						setError('message', {
							type: 'custom',
							message: 'This message has already added!',
						})
						console.log(response)
						return
					} else {
						insertNewMessage(newMessage)
							.then(response => {
								if (response === undefined) {
									setAlertType('success')
									reset()
								} else {
									setAlertType('error')
								}
								console.log(response)
							})
							.finally(() => {
								setShowLoading(false)
								dispatch(fncFetchMessages())
							})
					}
				})
				.finally(() => {
					setShowLoading(false)
				})
		}
	})

	useEffect(() => {
		fetchCategories().then(response => {
			const categoriesArr = []
			response.map(category =>
				categoriesArr.push({
					value: category.category_id,
					label: category.name,
				}),
			)
			const sortedArr = categoriesArr.sort((a, b) => {
				if (a.label < b.label) {
					return -1
				}
				if (a.label > b.label) {
					return 1
				}
				return 0
			})
			dispatch(categorySliceAction.addCategoriesForReactSelect(sortedArr))
		})
	}, [])

	useEffect(() => {
		if (alertType === 'success') {
			setTimeout(() => {
				setAlertType(null)
			}, 2000)
		}
	}, [alertType])

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
									Add New Message
								</Dialog.Title>
								<div className='mt-2'>
									{/* Alert message */}
									{alertType && showAlert}
									<form onSubmit={onSubmitFormHandler}>
										<div className='mb-2'>
											<label
												htmlFor='message'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Your message
											</label>
											<textarea
												id='message'
												rows='4'
												className={`outline-none bg-gray-50 border ${
													errors.message &&
													'border-red-500 focus:border-red-500'
												} border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
												placeholder='Add a message here!'
												{...register('message', {
													required: {
														value: true,
														message: 'This field cannot be empty!',
													},
												})}
											></textarea>
											<div>
												<p className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
													{errors.message && errors.message.message}
												</p>
											</div>
										</div>
										<div className='mb-5'>
											<label
												htmlFor='base-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Source
											</label>
											<input
												type='text'
												id='base-input'
												className='outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='Source'
												{...register('source')}
											/>
										</div>
										<div className='mb-5'>
											<label
												htmlFor='base-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Category
											</label>
											<Controller
												name='category'
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
																borderColor: errors.category && 'red',
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
														options={categories}
													/>
												)}
											/>
											<div>
												<p className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
													{errors.category && errors.category.message}
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

export default AddMessageModal
