// react
import { useState } from 'react'
// components
import AddMessageModal from './AddMessageModal/AddMessageModal'
import AddCategoryModal from './AddCategory/AddCategory'

const Message = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false)

	const openAddMessageModal = () => {
		setIsOpen(true)
	}

	const closeAddMessageModal = () => {
		setIsOpen(false)
	}

	const openAddCategoryModal = () => {
		setIsOpenAddCategoryModal(true)
	}

	const closeAddCategoryModal = () => {
		setIsOpenAddCategoryModal(false)
	}

	return (
		<>
			<h1 className='font-bold text-lg'>Sección para agregar nuevo mensaje</h1>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
				onClick={openAddMessageModal}
			>
				Agregar mensaje
			</button>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				onClick={openAddCategoryModal}
			>
				Agregar categoría
			</button>
			{/* Add New Message Modal */}
			{isOpen && (
				<AddMessageModal isOpen={isOpen} closeModal={closeAddMessageModal} />
			)}
			{isOpenAddCategoryModal && (
				<AddCategoryModal
					isOpen={isOpenAddCategoryModal}
					closeModal={closeAddCategoryModal}
				/>
			)}
		</>
	)
}

export default Message
