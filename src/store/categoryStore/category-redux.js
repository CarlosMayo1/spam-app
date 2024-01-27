import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categories: [],
	categoriesForReactSelect: [],
}

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		addCategoriesForReactSelect(state, action) {
			state.categoriesForReactSelect = action.payload
		},
	},
})

export default categorySlice.reducer
export const categorySliceAction = categorySlice.actions
