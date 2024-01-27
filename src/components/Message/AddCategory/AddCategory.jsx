// react
import { Fragment, useState, useEffect } from 'react'
// react-hook-form
import { useForm } from 'react-hook-form'
// headlessui
import { Dialog, Transition } from '@headlessui/react'
// utils
import { insertNewCategory, searchCategory } from '../../../utils/category'
// components
import SuccessAlert from '../../UI/Alert/SuccessAlert/SuccessAlert'
import ErrorAlert from '../../UI/Alert/ErrorAlert/ErrorAlert'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'

const AddCategoryModal = ({ isOpen, closeModal }) => {
	const [alertType, setAlertType] = useState(null)
	const [showLoading, setShowLoading] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm()

	const onSubmitHandleForm = handleSubmit(data => {
		setShowLoading(true)
		const newCategory = {
			name: data.category,
			status: 1,
		}

		// ⚠️validate in order to not repeat information
		searchCategory(newCategory.name)
			.then(response => {
				if (response.length > 0) {
					setError('category', {
						type: 'custom',
						message: 'This category has already been added!',
					})
					return
				}

				insertNewCategory(newCategory).then(response => {
					if (response === undefined) {
						setAlertType('success')
						reset()
					} else {
						setAlertType('error')
					}
				})
			})
			.finally(() => {
				setShowLoading(false)
				setTimeout(() => {
					setAlertType(null)
				}, 2000)
			})
	})

	const showAlert =
		alertType === 'success' ? (
			<SuccessAlert message='New category added successfully' />
		) : (
			<ErrorAlert message='Sorry! There was an error' />
		)

	useEffect(() => {
		setTimeout(() => {
			setAlertType(null)
		}, 2000)
	}, [alertType])

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
									Add New Message Category
								</Dialog.Title>

								<div className='mt-2'>
									{/* Alert message */}
									{alertType && showAlert}
									<form onSubmit={onSubmitHandleForm}>
										<div className='mb-5'>
											<label
												htmlFor='base-input'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1'
											>
												Category
											</label>
											<input
												type='text'
												id='base-input'
												className={`outline-none bg-gray-50 border ${
													errors.category &&
													'border-red-500 focus:border-red-500'
												} border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
												{...register('category', {
													required: {
														value: true,
														message: 'This field cannot be empty',
													},
												})}
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

export default AddCategoryModal
