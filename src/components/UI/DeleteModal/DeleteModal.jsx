// react
import { Fragment } from 'react'
// react redux
import { useSelector, useDispatch } from 'react-redux'
// headles-ui
import { Dialog, Transition } from '@headlessui/react'
// tabler-icon
import { IconCircleCheck, IconBug } from '@tabler/icons-react'

const DeleteModal = ({ isOpen, closeModal }) => {
	const deleteModal = useSelector(state => state.messageReducer.deleteModal)

	const modalIcon =
		deleteModal.type === 'success' ? (
			<IconCircleCheck className='text-green-500' size={50} strokeWidth={1.5} />
		) : (
			<IconBug className='text-red-500' size={50} strokeWidth={1.5} />
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
									className='flex justify-center text-lg font-medium leading-6 text-gray-900'
								>
									{modalIcon}
								</Dialog.Title>
								<h4 className='text-center font-medium text-xl'>
									{deleteModal.title}
								</h4>
								<div className='mt-2'>
									<p className='text-normal text-center text-gray-500'>
										{deleteModal.message}
									</p>
								</div>

								<div className='mt-4 text-center'>
									<button
										type='button'
										className='inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
										onClick={closeModal}
									>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default DeleteModal
