// utils
import { fetchCategories } from '../../utils/category'
// store
import { categorySliceAction } from './category-redux'

export const fncFetchCategoriesForSelect = () => {
	return async function fetchAllCategories(dispatch) {
		fetchCategories().then(response => {
			const categoriesArr = []
			console.log(response)
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
	}
}
