// react
import { useState, useEffect } from 'react'
// utils
import { fetchCategories } from '../../../utils/category'
// UI
import Card from '../../UI/Card/Card'

const Categories = () => {
	const [listOfCategories, setListOfCategories] = useState([])

	useEffect(() => {
		fetchCategories().then(response => {
			console.log(response)
		})
	}, [])

	return (
		<Card>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							Product name
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
					<tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Apple MacBook Pro 17"
						</th>
						<td className='px-6 py-4'>Laptop</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Edit
							</a>
						</td>
					</tr>
					<tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Microsoft Surface Pro
						</th>
						<td className='px-6 py-4'>Laptop PC</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Edit
							</a>
						</td>
					</tr>
					<tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Magic Mouse 2
						</th>
						<td className='px-6 py-4'>Accessories</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Edit
							</a>
						</td>
					</tr>
					<tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Google Pixel Phone
						</th>
						<td className='px-6 py-4'>Phone</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Edit
							</a>
						</td>
					</tr>
					<tr>
						<th
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							Apple Watch 5
						</th>
						<td className='px-6 py-4'>Wearables</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Edit
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</Card>
	)
}

export default Categories
