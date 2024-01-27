import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './categoryStore/category-redux'

const store = configureStore({
	reducer: {
		categoryReducer,
	},
})

export default store
